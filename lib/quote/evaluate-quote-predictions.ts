export interface QuoteBenchmarkCase {
  case_id: string
  board_revision: string
  split: "calibration" | "validation"
  currency: string
  actual_manufacturing_cost: number | null
  actual_shipping_cost: number | null
  actual_duties_cost: number | null
  actual_import_tax_cost: number | null
  actual_customs_duties_and_taxes_cost?: number | null
  actual_tax_cost: number | null
  actual_brokerage_cost: number | null
  /** After discounts, supplements and refunds. Null until reconciled to a final invoice. */
  actual_total_cost: number | null
  is_final_invoice: boolean
}
export interface QuotePrediction {
  case_id: string
  currency: string
  manufacturing_cost?: number
  shipping_cost?: number
  duties_cost?: number
  import_tax_cost?: number
  customs_duties_and_taxes_cost?: number
  tax_cost?: number
  brokerage_cost?: number
  total_cost?: number
}

/** Averages cannot hide a board outside tolerance. Incomplete rows never pass. */
export function evaluateQuotePredictions(
  cases: QuoteBenchmarkCase[],
  predictions: QuotePrediction[],
  tolerance = 0.05,
) {
  if (!Number.isFinite(tolerance) || tolerance < 0)
    throw new Error("Invalid tolerance")
  const seen = new Set<string>()
  const revisions = new Map<string, string>()
  for (const sample of cases) {
    if (
      !["calibration", "validation"].includes(sample.split) ||
      !sample.case_id ||
      !sample.board_revision
    )
      throw new Error("Invalid benchmark identity or split")
    if (seen.has(sample.case_id)) throw new Error("Duplicate benchmark case")
    seen.add(sample.case_id)
    if (
      revisions.has(sample.board_revision) &&
      revisions.get(sample.board_revision) !== sample.split
    )
      throw new Error("Board revision leaks between calibration and validation")
    revisions.set(sample.board_revision, sample.split)
  }
  const byId = new Map<string, QuotePrediction>()
  for (const prediction of predictions) {
    if (byId.has(prediction.case_id) || !seen.has(prediction.case_id))
      throw new Error("Duplicate or unknown prediction")
    byId.set(prediction.case_id, prediction)
  }
  const metrics = [
    "manufacturing_cost",
    "shipping_cost",
    "customs_duties_and_taxes_cost",
    "tax_cost",
    "brokerage_cost",
    "total_cost",
  ] as const
  const rows = cases
    .filter((sample) => sample.split === "validation")
    .map((sample) => {
      const prediction = byId.get(sample.case_id)
      const errors = Object.fromEntries(
        metrics.map((metric) => {
          const actual =
            metric === "customs_duties_and_taxes_cost"
              ? (sample.actual_customs_duties_and_taxes_cost ??
                (sample.actual_duties_cost !== null &&
                sample.actual_import_tax_cost !== null
                  ? sample.actual_duties_cost + sample.actual_import_tax_cost
                  : null))
              : sample[`actual_${metric}`]
          const predicted =
            metric === "customs_duties_and_taxes_cost"
              ? (prediction?.customs_duties_and_taxes_cost ??
                (prediction?.duties_cost !== undefined &&
                prediction.import_tax_cost !== undefined
                  ? prediction.duties_cost + prediction.import_tax_cost
                  : undefined))
              : prediction?.[metric]
          if (
            sample.is_final_invoice !== true ||
            !prediction ||
            prediction.currency !== sample.currency ||
            actual === null ||
            !Number.isFinite(actual) ||
            actual < 0 ||
            predicted === undefined ||
            !Number.isFinite(predicted) ||
            predicted < 0
          )
            return [metric, null]
          return [
            metric,
            actual === 0
              ? predicted === 0
                ? 0
                : Infinity
              : Math.abs(predicted - actual) / actual,
          ]
        }),
      ) as Record<(typeof metrics)[number], number | null>
      return {
        case_id: sample.case_id,
        errors,
        passed: metrics.every(
          (key) => errors[key] !== null && errors[key]! <= tolerance + 1e-12,
        ),
      }
    })
  return {
    tolerance,
    validation_count: rows.length,
    passed_count: rows.filter((row) => row.passed).length,
    passed: rows.length > 0 && rows.every((row) => row.passed),
    rows,
  }
}
