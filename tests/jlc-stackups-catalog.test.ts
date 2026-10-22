import { expect, test } from "bun:test"
import * as specifications from "../index"

test("catalog names are unique and every stackup is publicly exported", () => {
  const { jlcStackups } = specifications
  const namedStackups = Object.entries(specifications)
    .filter(([name]) => /^jlc\d.*Stackup$/.test(name))
    .map(([, stackup]) => stackup)

  expect(new Set(jlcStackups.map(({ name }) => name)).size).toBe(
    jlcStackups.length,
  )
  expect(namedStackups).toHaveLength(jlcStackups.length)
  for (const stackup of jlcStackups) {
    expect(stackup.name.trim().length).toBeGreaterThan(0)
    expect(
      namedStackups.some((exported) => exported === stackup),
      stackup.name,
    ).toBe(true)
  }
})
