import { core, createJlcStackup } from "../jlc-stackup-builders"

export const jlc0204Stackup = createJlcStackup({
  name: "JLC0204",
  thickness: 0.4,
  outer_copper_thickness: 0.03,
  dielectrics: [core(0.4, 4.36)],
})

export const jlc0206Stackup = createJlcStackup({
  name: "JLC0206",
  thickness: 0.6,
  outer_copper_thickness: 0.03,
  dielectrics: [core(0.5, 4.48)],
})

export const jlc0210Stackup = createJlcStackup({
  name: "JLC0210",
  thickness: 1,
  outer_copper_thickness: 0.03,
  dielectrics: [core(0.83, 4.55)],
})

export const jlc0212Stackup = createJlcStackup({
  name: "JLC0212",
  thickness: 1.2,
  outer_copper_thickness: 0.03,
  dielectrics: [core(1.03, 4.38)],
})

export const jlc0216Stackup = createJlcStackup({
  name: "JLC0216",
  thickness: 1.6,
  outer_copper_thickness: 0.03,
  dielectrics: [core(1.43, 4.42)],
})
