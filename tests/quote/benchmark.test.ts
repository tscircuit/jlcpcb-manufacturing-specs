import { expect, test } from "bun:test"
import {
  evaluateQuotePredictions,
  type QuoteBenchmarkCase,
} from "../../lib/quote/evaluate-quote-predictions"

test("5% validation fails for missing, nonfinal or outlying boards and detects leakage", () => {
  const actual: QuoteBenchmarkCase = {
    case_id: "heldout",
    board_revision: "rev1",
    split: "validation",
    currency: "USD",
    actual_manufacturing_cost: 100,
    actual_shipping_cost: 0,
    actual_duties_cost: 0,
    actual_import_tax_cost: 0,
    actual_tax_cost: 0,
    actual_brokerage_cost: 0,
    actual_total_cost: 100,
    is_final_invoice: true,
  }
  const prediction = {
    case_id: "heldout",
    currency: "USD",
    manufacturing_cost: 105,
    shipping_cost: 0,
    duties_cost: 0,
    import_tax_cost: 0,
    tax_cost: 0,
    brokerage_cost: 0,
    total_cost: 105,
  }
  expect(evaluateQuotePredictions([actual], [prediction]).passed).toBe(true)
  expect(
    evaluateQuotePredictions([actual], [{ ...prediction, total_cost: 105.01 }])
      .passed,
  ).toBe(false)
  expect(evaluateQuotePredictions([actual], []).passed).toBe(false)
  expect(evaluateQuotePredictions([], []).passed).toBe(false)
  expect(
    evaluateQuotePredictions(
      [{ ...actual, is_final_invoice: false }],
      [prediction],
    ).passed,
  ).toBe(false)
  expect(
    evaluateQuotePredictions([actual], [{ ...prediction, shipping_cost: 0.01 }])
      .passed,
  ).toBe(false)
  expect(
    evaluateQuotePredictions([actual], [{ ...prediction, currency: "EUR" }])
      .passed,
  ).toBe(false)
  expect(() =>
    evaluateQuotePredictions(
      [actual, { ...actual, case_id: "train", split: "calibration" }],
      [],
    ),
  ).toThrow("leaks")
})
