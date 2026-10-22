import { expect, test } from "bun:test"
import { getJlcStackup } from "../index"

test("returns undefined for unsupported constructions", () => {
  for (const num_layers of [0, 1, 3, 5, 7, 10, 12]) {
    expect(getJlcStackup({ num_layers, thickness: 1.6 })).toBeUndefined()
  }

  for (const num_layers of [2, 4, 6, 8]) {
    for (const thickness of [0, -1, 0.3, 1.61, NaN, Infinity]) {
      expect(getJlcStackup({ num_layers, thickness })).toBeUndefined()
    }
    for (const material of ["flex", "fr1"] as const) {
      expect(
        getJlcStackup({ num_layers, thickness: 1.6, material }),
      ).toBeUndefined()
    }
  }
})
