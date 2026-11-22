import type { PcbQuoteEstimate } from "circuit-json"

/** All amounts are order totals in currency major units. undefined is unknown. */
export const manufacturingCostKeys = [
  "pcb_fabrication_cost",
  "pcb_setup_cost",
  "assembly_setup_cost",
  "assembly_placement_cost",
  "assembly_labor_cost",
  "stencil_cost",
  "packaging_cost",
  "parts_placement_confirmation_cost",
  "special_components_cost",
  "expedited_build_cost",
  "components_cost",
  "extended_component_loading_cost",
  "component_attrition_cost",
  "component_baking_cost",
  "hand_soldering_cost",
  "x_ray_inspection_cost",
  "small_hole_cost",
  "via_in_pad_cost",
  "via_filling_cost",
  "kelvin_test_cost",
  "impedance_control_cost",
  "surface_finish_cost",
  "panelization_cost",
  "engineering_cost",
  "other_manufacturing_cost",
] as const
export const deliveryCostKeys = [
  "shipping_cost",
  "duties_cost",
  "import_tax_cost",
  "tax_cost",
  "brokerage_cost",
] as const
export type QuoteCostKey =
  | (typeof manufacturingCostKeys)[number]
  | (typeof deliveryCostKeys)[number]
export type QuoteCosts = Partial<
  Record<QuoteCostKey | "customs_duties_and_taxes_cost", number>
>
export interface QuoteVia {
  pcb_via_id: string
  hole_diameter: number
  outer_diameter: number
}
export interface QuoteInput {
  material: "fr4"
  /** SHA-256 of the exact supplier request, including files, revision and all options. */
  quote_request_hash: string
  pcb_board_id: string
  quantity: number
  assembled_quantity?: number
  num_layers: number
  vias: QuoteVia[]
  destination_country_code?: string
  shipping_service?: string
}
export interface QuoteEvidence {
  quote_request_hash: string
  material: "fr4"
  pricing_model_version: string
  currency: "USD"
  estimated_at: string
  expires_at: string
  source_url: string
  /** Match these to the supplier quote request, never reuse a different quantity/destination. */
  pcb_board_id: string
  quantity: number
  assembled_quantity?: number
  num_layers: number
  destination_country_code?: string
  shipping_service?: string
  /** Set inapplicable costs to zero. Do not include a fee twice under different keys. */
  costs: QuoteCosts
  discount_cost?: number
  /** Fees already in the supplier baseline must not be added again. */
  includes_small_hole_and_kelvin_costs: boolean
}

const money = (value: number) => {
  if (
    !Number.isFinite(value) ||
    value < 0 ||
    value > Number.MAX_SAFE_INTEGER / 100
  )
    throw new Error("Invalid monetary total")
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/** JLCPCB rule observed 2026-10-26. Each via's drill/pad dimensions are paired.
 * Source: https://cart.jlcpcb.com/quote (rigid FR4 only).
 * A 0.2/0.45mm via exception applies to multilayer boards, not 2-layer boards.
 */
export function getJlcpcbPrecisionViaIds(
  num_layers: number,
  vias: QuoteVia[],
): string[] {
  if (!Number.isInteger(num_layers) || num_layers < 2)
    throw new Error("Invalid layer count")
  return vias
    .filter((via) => {
      if (
        ![via.hole_diameter, via.outer_diameter].every(
          (n) => Number.isFinite(n) && n > 0,
        ) ||
        via.hole_diameter >= via.outer_diameter
      )
        throw new Error("Invalid via dimensions")
      const standard = via.hole_diameter >= 0.3 && via.outer_diameter >= 0.4
      const multilayerException =
        num_layers > 2 && via.hole_diameter >= 0.2 && via.outer_diameter >= 0.45
      return !standard && !multilayerException
    })
    .map((via) => via.pcb_via_id)
}

/** Compose an estimate from dated supplier evidence. Unknown fees remain unknown.
 * This deliberately does not invent an area-based fabrication price or a country-only tariff.
 * The caller must obtain a supplier quote for the exact PCB revision/options and map its
 * disjoint line items into costs. The estimate cannot certify <=5% accuracy by itself.
 */
export function estimateJlcpcbQuote(
  input: QuoteInput,
  evidence: QuoteEvidence,
  now = new Date(),
): PcbQuoteEstimate {
  if (input.material !== "fr4") throw new Error("Only rigid FR4 is supported")
  if (!/^[a-f0-9]{64}$/.test(input.quote_request_hash))
    throw new Error("Invalid quote request hash")
  if (!Number.isInteger(input.quantity) || input.quantity <= 0)
    throw new Error("Invalid quantity")
  if (
    input.assembled_quantity !== undefined &&
    (!Number.isInteger(input.assembled_quantity) ||
      input.assembled_quantity < 0 ||
      input.assembled_quantity > input.quantity)
  )
    throw new Error("Invalid assembled quantity")
  if (evidence.currency !== "USD") throw new Error("Invalid currency")
  if (
    input.destination_country_code !== undefined &&
    !/^[A-Z]{2}$/.test(input.destination_country_code)
  )
    throw new Error("Invalid country code")
  for (const key of [
    "quote_request_hash",
    "material",
    "pcb_board_id",
    "quantity",
    "assembled_quantity",
    "num_layers",
    "destination_country_code",
    "shipping_service",
  ] as const) {
    if (input[key] !== evidence[key])
      throw new Error(`Quote evidence does not match ${key}`)
  }
  const start = Date.parse(evidence.estimated_at)
  const end = Date.parse(evidence.expires_at)
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start > now.getTime() ||
    end <= now.getTime() ||
    end <= start
  )
    throw new Error("Quote evidence is invalid or expired")
  for (const amount of [
    ...Object.values(evidence.costs),
    evidence.discount_cost ?? 0,
  ]) {
    if (amount !== undefined && (!Number.isFinite(amount) || amount < 0))
      throw new Error("Invalid cost")
  }
  if (
    evidence.costs.customs_duties_and_taxes_cost !== undefined &&
    (evidence.costs.duties_cost !== undefined ||
      evidence.costs.import_tax_cost !== undefined)
  )
    throw new Error(
      "Combined customs costs cannot be counted with itemized duties/import tax",
    )
  const costs: QuoteCosts = {}
  for (const key of [
    ...manufacturingCostKeys,
    ...deliveryCostKeys,
    "customs_duties_and_taxes_cost" as const,
  ]) {
    if (evidence.costs[key] !== undefined)
      costs[key] = money(evidence.costs[key]!)
  }
  const warnings: string[] = []
  const precisionViaIds = getJlcpcbPrecisionViaIds(input.num_layers, input.vias)
  if (
    precisionViaIds.length &&
    !evidence.includes_small_hole_and_kelvin_costs
  ) {
    delete costs.small_hole_cost
    delete costs.kelvin_test_cost
    warnings.push(
      "Precision vias require a supplier quote including small-hole and 4-wire Kelvin testing fees.",
    )
  }
  // Without a destination, delivery/import estimates are unknown even if the baseline contains zeros.
  if (!input.destination_country_code) {
    for (const key of deliveryCostKeys) delete costs[key]
    delete costs.customs_duties_and_taxes_cost
  }
  if (!input.shipping_service) delete costs.shipping_cost
  const manufacturingComplete = manufacturingCostKeys.every(
    (key) => costs[key] !== undefined,
  )
  const deliveryKeys: (QuoteCostKey | "customs_duties_and_taxes_cost")[] =
    costs.customs_duties_and_taxes_cost !== undefined
      ? [
          "shipping_cost",
          "customs_duties_and_taxes_cost",
          "tax_cost",
          "brokerage_cost",
        ]
      : [...deliveryCostKeys]
  const landedComplete =
    manufacturingComplete &&
    deliveryKeys.every((key) => costs[key] !== undefined)
  const manufacturing = manufacturingComplete
    ? money(manufacturingCostKeys.reduce((sum, key) => sum + costs[key]!, 0))
    : undefined
  const discount = money(evidence.discount_cost ?? 0)
  const total = landedComplete
    ? money(
        manufacturing! +
          deliveryKeys.reduce((sum, key) => sum + costs[key]!, 0) -
          discount,
      )
    : undefined
  if (total !== undefined && total < 0)
    throw new Error("Discount exceeds order total")
  return {
    type: "pcb_quote_estimate" as const,
    pcb_quote_estimate_id: `pcb_quote_estimate_${input.quote_request_hash}_${evidence.pricing_model_version}`,
    quote_request_hash: input.quote_request_hash,
    pcb_board_id: input.pcb_board_id,
    supplier_name: "jlcpcb",
    currency: evidence.currency,
    quantity: input.quantity,
    assembled_quantity: input.assembled_quantity,
    estimated_at: evidence.estimated_at,
    expires_at: evidence.expires_at,
    pricing_model_version: evidence.pricing_model_version,
    destination_country_code: input.destination_country_code,
    shipping_service: input.shipping_service,
    ...costs,
    discount_cost: discount,
    manufacturing_cost: manufacturing,
    total_cost: total,
    unit_cost: total === undefined ? undefined : total / input.quantity,
    is_manufacturing_cost_complete: manufacturingComplete,
    is_landed_cost_complete: landedComplete,
    warnings,
    assumptions: [
      `Supplier evidence: ${evidence.source_url}`,
      "Rigid FR4; caller must match the exact PCB revision, finish, stackup and assembly options.",
    ],
  }
}
