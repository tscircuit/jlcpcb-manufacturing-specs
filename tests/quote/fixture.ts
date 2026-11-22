import {
  deliveryCostKeys,
  manufacturingCostKeys,
  type QuoteEvidence,
  type QuoteInput,
} from "../../lib/quote/estimate-jlcpcb-quote"
export const input: QuoteInput = {
  material: "fr4",
  quote_request_hash: "a".repeat(64),
  pcb_board_id: "board_revision_1",
  quantity: 5,
  num_layers: 4,
  vias: [],
  destination_country_code: "US",
  shipping_service: "DHL",
}
export const evidence: QuoteEvidence = {
  ...input,
  pricing_model_version: "test_rates_v1",
  currency: "USD",
  estimated_at: "2026-10-25T00:00:00Z",
  expires_at: "2026-10-27T00:00:00Z",
  source_url: "https://example.com/synthetic-test-quote",
  costs: {
    ...Object.fromEntries(
      [...manufacturingCostKeys, ...deliveryCostKeys].map((key) => [key, 0]),
    ),
    pcb_fabrication_cost: 20,
    assembly_setup_cost: 8,
    shipping_cost: 12,
    duties_cost: 4,
    tax_cost: 2,
  },
  includes_small_hole_and_kelvin_costs: true,
}
export const now = new Date("2026-10-26T00:00:00Z")
