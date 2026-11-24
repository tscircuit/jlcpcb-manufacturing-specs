import { expect, test } from "bun:test"
import { jlcMinTolerances, jlcPreferredTolerances } from "../index"

test("via hole edge clearance follows JLCPCB's published drilling capability", () => {
  const minimumClearance =
    jlcMinTolerances.min_via_hole_edge_to_via_hole_edge_clearance

  expect(minimumClearance).toBe(0.2)
  expect(
    jlcPreferredTolerances.min_via_hole_edge_to_via_hole_edge_clearance,
  ).toBeGreaterThanOrEqual(minimumClearance!)
})
