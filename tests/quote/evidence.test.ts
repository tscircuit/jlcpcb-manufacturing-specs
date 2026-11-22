import { expect, test } from "bun:test"
import { estimateJlcpcbQuote } from "../../lib/quote/estimate-jlcpcb-quote"
import { evidence, input, now } from "./fixture"

test("stale or mismatched supplier evidence and invalid money are rejected", () => {
  for (const invalid of [
    { quote_request_hash: "b".repeat(64) },
    { expires_at: "2026-10-26T00:00:00Z" },
    { quantity: 10 },
    { destination_country_code: "DE" },
    { shipping_service: "FedEx" },
    { costs: { ...evidence.costs, shipping_cost: NaN } },
    { costs: { ...evidence.costs, kelvin_test_cost: -1 } },
  ])
    expect(() =>
      estimateJlcpcbQuote(input, { ...evidence, ...invalid }, now),
    ).toThrow()
})
