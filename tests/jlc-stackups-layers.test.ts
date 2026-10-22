import { expect, test } from "bun:test"
import type { LayerRef } from "circuit-json"
import { jlcStackups } from "../index"

test("stackups have ordered copper layers and positive physical properties", () => {
  const copperNames: Record<number, LayerRef[]> = {
    2: ["top", "bottom"],
    4: ["top", "inner1", "inner2", "bottom"],
    6: ["top", "inner1", "inner2", "inner3", "inner4", "bottom"],
    8: [
      "top",
      "inner1",
      "inner2",
      "inner3",
      "inner4",
      "inner5",
      "inner6",
      "bottom",
    ],
  }

  for (const stackup of jlcStackups) {
    expect(stackup.material, stackup.name).toBe("fr4")
    expect(Number.isFinite(stackup.thickness), stackup.name).toBe(true)
    expect(stackup.thickness, stackup.name).toBeGreaterThan(0)
    const copperLayers = stackup.layers.filter(
      (layer) => layer.layer_type === "copper",
    )
    expect(
      copperLayers.map(({ layer }) => layer),
      stackup.name,
    ).toEqual(copperNames[stackup.num_layers]!)
    expect(stackup.layers[0]?.layer_type, stackup.name).toBe("copper")
    expect(stackup.layers.at(-1)?.layer_type, stackup.name).toBe("copper")

    for (const [index, layer] of stackup.layers.entries()) {
      const location = `${stackup.name}, physical layer ${index + 1}`
      expect(Number.isFinite(layer.thickness), location).toBe(true)
      expect(layer.thickness, location).toBeGreaterThan(0)
      if (layer.layer_type === "copper" && index > 0) {
        expect(stackup.layers[index - 1]?.layer_type, location).toBe(
          "dielectric",
        )
      }
      if (layer.layer_type === "dielectric") {
        expect(Number.isFinite(layer.relative_permittivity), location).toBe(
          true,
        )
        expect(layer.relative_permittivity, location).toBeGreaterThan(0)
      }
    }
  }
})
