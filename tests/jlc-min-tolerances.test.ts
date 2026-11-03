import { expect, test } from "bun:test"
import orders from "../datasets/jlcpcb/shipped-order-observations.json"
import supplements from "../datasets/jlcpcb/supplement-observations.json"
import { jlcMinTolerances, jlcPreferredTolerances } from "../index"

test("jlcMinTolerances via defaults use standard no-surcharge 0.3mm/0.45mm dimensions", () => {
  expect(jlcMinTolerances.min_via_hole_diameter).toBe(0.3)
  expect(jlcMinTolerances.min_via_pad_diameter).toBe(0.45)
  expect(jlcPreferredTolerances.min_trace_to_hole_edge_clearance).toBe(0.2)

  for (const notice of supplements) {
    if (!notice.contains_kelvin_test) continue
    const triggersKelvinNotice =
      jlcMinTolerances.min_via_hole_diameter! <= notice.hole_diameter_mm &&
      jlcMinTolerances.min_via_pad_diameter! <= notice.outer_diameter_mm
    expect(triggersKelvinNotice).toBe(false)
  }

  const noKelvinOrder = orders.find((order) => order.order_suffix === "Y63")
  expect(noKelvinOrder?.kelvin_test_required).toBe(false)
  expect(jlcMinTolerances.min_via_hole_diameter).toBe(
    noKelvinOrder?.via_hole_option_mm,
  )
  expect(noKelvinOrder?.via_outer_diameter_option_mm).toContain(
    jlcMinTolerances.min_via_pad_diameter!,
  )
})
