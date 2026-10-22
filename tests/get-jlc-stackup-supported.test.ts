import { expect, test } from "bun:test"
import { getJlcStackup, jlc04161h3313Stackup, jlcStackups } from "../index"

test("matches supported constructions and preserves the legacy default", () => {
  expect(getJlcStackup({ num_layers: 4, thickness: 1.6 })).toBe(
    jlc04161h3313Stackup,
  )
  expect(
    getJlcStackup({ num_layers: 4, thickness: 1.6, material: "fr4" }),
  ).toBe(jlc04161h3313Stackup)

  for (const [num_layers, thicknesses] of [
    [2, [0.4, 0.6, 1, 1.2, 1.6]],
    [4, [0.4, 0.6, 0.8, 1, 1.2, 1.6, 2]],
    [6, [0.6, 0.8, 1, 1.2, 1.6, 2]],
    [8, [0.8, 1, 1.2, 1.6, 2]],
  ] as const) {
    for (const thickness of thicknesses) {
      const construction = { num_layers, thickness }
      const stackup = getJlcStackup(construction)
      expect(stackup, `${num_layers} layers, ${thickness} mm`).toMatchObject({
        ...construction,
        material: "fr4",
      })
      expect(jlcStackups).toContain(stackup!)
      expect(getJlcStackup({ ...construction, material: "fr4" })).toBe(stackup)
    }
  }
})
