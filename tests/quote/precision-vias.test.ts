import { expect, test } from "bun:test"
import {
  estimateJlcpcbQuote,
  getJlcpcbPrecisionViaIds,
} from "../../lib/quote/estimate-jlcpcb-quote"
import { evidence, input, now } from "./fixture"

const observations = [
  {
    case_id: "small_drill_small_pad",
    hole_diameter_mm: 0.15,
    outer_diameter_mm: 0.3,
  },
  {
    case_id: "small_drill_standard_pad",
    hole_diameter_mm: 0.2,
    outer_diameter_mm: 0.4,
  },
]

test("documented small-via cases require fees unless included, without double counting", () => {
  for (const sample of observations) {
    const vias = [
      {
        pcb_via_id: sample.case_id,
        hole_diameter: sample.hole_diameter_mm,
        outer_diameter: sample.outer_diameter_mm,
      },
    ]
    expect(getJlcpcbPrecisionViaIds(4, vias)).toEqual([sample.case_id])
    const quote = estimateJlcpcbQuote(
      { ...input, vias },
      { ...evidence, includes_small_hole_and_kelvin_costs: false },
      now,
    )
    expect(quote.kelvin_test_cost).toBeUndefined()
    expect(quote.total_cost).toBeUndefined()
    const included = estimateJlcpcbQuote(
      { ...input, vias },
      { ...evidence, costs: { ...evidence.costs, kelvin_test_cost: 10 } },
      now,
    )
    expect(included.kelvin_test_cost).toBe(10)
    expect(included.manufacturing_cost).toBe(38)
  }
  const via = { pcb_via_id: "via", hole_diameter: 0.2, outer_diameter: 0.45 }
  expect(getJlcpcbPrecisionViaIds(4, [via])).toEqual([])
  expect(getJlcpcbPrecisionViaIds(2, [via])).toEqual(["via"])
})
