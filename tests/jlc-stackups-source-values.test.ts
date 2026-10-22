import { expect, test } from "bun:test"
import { jlcStackups } from "../index"

test("preserves representative physical values from JLCPCB source templates", () => {
  const cases: {
    name: string
    copper: number[]
    dielectrics: ["core" | "prepreg", number, number][]
  }[] = [
    {
      name: "JLC0204",
      copper: [0.03, 0.03],
      dielectrics: [["core", 0.4, 4.36]],
    },
    {
      name: "JLC0216",
      copper: [0.03, 0.03],
      dielectrics: [["core", 1.43, 4.42]],
    },
    {
      name: "JLC04161H-3313",
      copper: [0.035, 0.0152, 0.0152, 0.035],
      dielectrics: [
        ["prepreg", 0.0994, 4.1],
        ["core", 1.265, 4.42],
        ["prepreg", 0.0994, 4.1],
      ],
    },
    {
      name: "JLC06161H-2116",
      copper: [0.035, 0.0152, 0.0152, 0.0152, 0.0152, 0.035],
      dielectrics: [
        ["prepreg", 0.127, 4.29],
        ["prepreg", 0.0964, 4.27],
        ["core", 0.3, 4.56],
        ["prepreg", 0.2084, 4.46],
        ["prepreg", 0.2084, 4.46],
        ["core", 0.3, 4.56],
        ["prepreg", 0.0964, 4.27],
        ["prepreg", 0.127, 4.29],
      ],
    },
    {
      name: "JLC08161H-3313",
      copper: [0.035, 0.0152, 0.0152, 0.0152, 0.0152, 0.0152, 0.0152, 0.035],
      dielectrics: [
        ["prepreg", 0.0994, 4.1],
        ["core", 0.1, 4.36],
        ["prepreg", 0.1164, 4.16],
        ["prepreg", 0.124, 4.16],
        ["prepreg", 0.1164, 4.16],
        ["core", 0.3, 4.41],
        ["prepreg", 0.1164, 4.16],
        ["prepreg", 0.124, 4.16],
        ["prepreg", 0.1164, 4.16],
        ["core", 0.1, 4.36],
        ["prepreg", 0.0994, 4.1],
      ],
    },
  ]

  for (const { name, copper, dielectrics } of cases) {
    const stackup = jlcStackups.find((candidate) => candidate.name === name)
    expect(stackup, name).toBeDefined()
    expect(
      stackup!.layers
        .filter((layer) => layer.layer_type === "copper")
        .map(({ thickness }) => thickness),
      name,
    ).toEqual(copper)
    expect(
      stackup!.layers
        .filter((layer) => layer.layer_type === "dielectric")
        .map(({ dielectric_type, thickness, relative_permittivity }) => [
          dielectric_type,
          thickness,
          relative_permittivity,
        ]),
      name,
    ).toEqual(dielectrics)
  }
})
