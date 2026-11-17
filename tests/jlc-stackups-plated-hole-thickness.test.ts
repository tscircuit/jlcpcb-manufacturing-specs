import { expect, test } from "bun:test"
import { jlcStackups } from "../index"

test("every JLCPCB stackup has the 18 µm hole plating thickness", () => {
  for (const stackup of jlcStackups)
    expect(stackup.plated_hole_copper_thickness).toBe(0.018)
})
