import { expect, test } from "bun:test"
import { estimateJlcpcbQuote } from "../../lib/quote/estimate-jlcpcb-quote"
import { evidence, input, now } from "./fixture"

test("unknown fees suppress totals and destination cannot be assumed", () => {
  const costs = { ...evidence.costs, component_baking_cost: undefined }
  const quote = estimateJlcpcbQuote(input, { ...evidence, costs }, now)
  expect(quote.total_cost).toBeUndefined()
  expect(quote.manufacturing_cost).toBeUndefined()
  const anonymous = estimateJlcpcbQuote(
    { ...input, destination_country_code: undefined },
    { ...evidence, destination_country_code: undefined },
    now,
  )
  expect(anonymous.manufacturing_cost).toBe(28)
  expect(anonymous.total_cost).toBeUndefined()
  expect(anonymous.duties_cost).toBeUndefined()
})
