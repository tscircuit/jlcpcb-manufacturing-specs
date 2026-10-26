import { expect, test } from "bun:test"
import { estimateJlcpcbQuote } from "../../lib/quote/estimate-jlcpcb-quote"
import { evidence, input, now } from "./fixture"

test("quotes separate manufacturing and delivery, applying discounts exactly once", () => {
  const quote = estimateJlcpcbQuote(
    input,
    { ...evidence, discount_cost: 1 },
    now,
  )
  expect(quote.manufacturing_cost).toBe(28)
  expect(quote.shipping_cost).toBe(12)
  expect(quote.duties_cost).toBe(4)
  expect(quote.total_cost).toBe(45)
  expect(quote.unit_cost).toBe(9)
  expect(quote.is_landed_cost_complete).toBe(true)
})
