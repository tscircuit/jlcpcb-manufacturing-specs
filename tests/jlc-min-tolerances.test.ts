import { expect, test } from "bun:test"
import supplements from "../datasets/jlcpcb/supplement-observations.json"
import { jlcMinTolerances } from "../index"

test("jlcMinTolerances via dimensions avoid mandatory 4-wire Kelvin test surcharge thresholds", () => {
  expect(jlcMinTolerances.min_via_hole_diameter).toBe(0.3)
  expect(jlcMinTolerances.min_via_pad_diameter).toBe(0.45)

  for (const notice of supplements) {
    if (!notice.contains_kelvin_test) continue
    const matchesKelvinNotice =
      jlcMinTolerances.min_via_hole_diameter! <= notice.hole_diameter_mm &&
      jlcMinTolerances.min_via_pad_diameter! <= notice.outer_diameter_mm
    expect(matchesKelvinNotice).toBe(false)
  }
})
