import type { LayerRef, PcbStackupLayer } from "circuit-json"

type DielectricLayer = Extract<PcbStackupLayer, { layer_type: "dielectric" }>

export interface JlcStackup {
  name: string
  num_layers: number
  thickness: number
  material: "fr4"
  layers: PcbStackupLayer[]
}

const prepregRelativePermittivity = {
  "106 RC72%": 3.92,
  "1080 RC67%": 3.91,
  "2116 RC54%": 4.16,
  "2116 RC57%": 4.29,
  "2313 RC58%": 4.27,
  "3313 RC57%": 4.1,
  "7628 RC49%": 4.4,
  "7628 RC50%": 4.46,
}

export type JlcPrepregName = keyof typeof prepregRelativePermittivity

export function prepreg(
  material_name: JlcPrepregName,
  thickness: number,
): DielectricLayer {
  return {
    layer_type: "dielectric",
    dielectric_type: "prepreg",
    material_name,
    thickness,
    relative_permittivity: prepregRelativePermittivity[material_name],
  }
}

export function core(
  thickness: number,
  relative_permittivity: number,
  laminate: "NP-155F" | "S1000-2M" = "NP-155F",
): DielectricLayer {
  return {
    layer_type: "dielectric",
    dielectric_type: "core",
    material_name: `${laminate} core`,
    thickness,
    relative_permittivity,
  }
}

function getCopperLayerName(index: number, num_layers: number): LayerRef {
  if (index === 0) return "top"
  if (index === num_layers - 1) return "bottom"
  return `inner${index}` as LayerRef
}

export function createJlcStackup({
  name,
  thickness,
  dielectrics,
  outer_copper_thickness = 0.035,
}: {
  name: string
  thickness: number
  dielectrics: Array<DielectricLayer | DielectricLayer[]>
  outer_copper_thickness?: number
}): JlcStackup {
  const num_layers = dielectrics.length + 1
  const layers: PcbStackupLayer[] = []

  for (let index = 0; index < num_layers; index++) {
    const isOuterLayer = index === 0 || index === num_layers - 1
    layers.push({
      layer_type: "copper",
      layer: getCopperLayerName(index, num_layers),
      thickness: isOuterLayer ? outer_copper_thickness : 0.0152,
      electrical_conductivity_s_per_m: 5.8e7,
    })

    const dielectric = dielectrics[index]
    if (dielectric) layers.push(...[dielectric].flat())
  }

  return { name, num_layers, thickness, material: "fr4", layers }
}
