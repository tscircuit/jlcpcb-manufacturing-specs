import type { PcbBoard } from "circuit-json"
import type { JlcStackup } from "./jlc-stackup-builders"
import * as twoLayerStackups from "./stackups/jlc-2-layer-stackups"
import * as fourLayerStackups from "./stackups/jlc-4-layer-stackups"
import * as sixLayerStackups from "./stackups/jlc-6-layer-stackups"
import * as eightLayerStackups from "./stackups/jlc-8-layer-stackups"

export type { JlcStackup } from "./jlc-stackup-builders"
export * from "./stackups/jlc-2-layer-stackups"
export * from "./stackups/jlc-4-layer-stackups"
export * from "./stackups/jlc-6-layer-stackups"
export * from "./stackups/jlc-8-layer-stackups"

export const jlcStackups: JlcStackup[] = [
  ...new Set([
    fourLayerStackups.jlc04161h3313Stackup,
    fourLayerStackups.jlc04061h2116Stackup,
    fourLayerStackups.jlc04081h7628Stackup,
    fourLayerStackups.jlc04101h7628Stackup,
    fourLayerStackups.jlc04121h7628Stackup,
    fourLayerStackups.jlc04201h7628Stackup,
    fourLayerStackups.jlc04251h2116Stackup,
    sixLayerStackups.jlc06061h3313Stackup,
    sixLayerStackups.jlc06081h2116Stackup,
    sixLayerStackups.jlc06101h3313Stackup,
    sixLayerStackups.jlc06121h3313Stackup,
    sixLayerStackups.jlc06161h3313Stackup,
    sixLayerStackups.jlc06181h7628Stackup,
    sixLayerStackups.jlc06201h3313Stackup,
    eightLayerStackups.jlc08081h1080Stackup,
    eightLayerStackups.jlc08101h3313Stackup,
    eightLayerStackups.jlc08121h3313Stackup,
    eightLayerStackups.jlc08161h2116Stackup,
    eightLayerStackups.jlc08201h7628Stackup,
    eightLayerStackups.jlc08301h7628Stackup,
    ...Object.values(twoLayerStackups),
    ...Object.values(fourLayerStackups),
    ...Object.values(sixLayerStackups),
    ...Object.values(eightLayerStackups),
  ]),
]

export interface JlcBoardConstruction {
  num_layers: number
  thickness: number
  material?: PcbBoard["material"]
}

export function getJlcStackup({
  num_layers,
  thickness,
  material = "fr4",
}: JlcBoardConstruction): JlcStackup | undefined {
  return jlcStackups.find(
    (stackup) =>
      stackup.num_layers === num_layers &&
      stackup.thickness === thickness &&
      stackup.material === material,
  )
}
