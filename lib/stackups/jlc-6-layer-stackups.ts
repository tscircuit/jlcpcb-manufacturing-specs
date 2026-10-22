import { core, createJlcStackup, prepreg } from "../jlc-stackup-builders"

export const jlc06061h1080Stackup = createJlcStackup({
  name: "JLC06061H-1080",
  thickness: 0.6,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.1, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.1, 4.36),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06061h3313Stackup = createJlcStackup({
  name: "JLC06061H-3313",
  thickness: 0.6,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.075, 3.99),
    prepreg("3313 RC57%", 0.0918),
    core(0.075, 3.99),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06081h1080Stackup = createJlcStackup({
  name: "JLC06081H-1080",
  thickness: 0.8,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.13, 4.17),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.13, 4.17),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06081h2116Stackup = createJlcStackup({
  name: "JLC06081H-2116",
  thickness: 0.8,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(0.13, 4.17),
    prepreg("7628 RC49%", 0.2028),
    core(0.13, 4.17),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc06081h2313Stackup = createJlcStackup({
  name: "JLC06081H-2313",
  thickness: 0.8,
  dielectrics: [
    prepreg("2313 RC58%", 0.0964),
    core(0.15, 4.35, "S1000-2M"),
    [prepreg("2313 RC58%", 0.0964), prepreg("2313 RC58%", 0.0964)],
    core(0.15, 4.35, "S1000-2M"),
    prepreg("2313 RC58%", 0.0964),
  ],
})

export const jlc06081h7628Stackup = createJlcStackup({
  name: "JLC06081H-7628",
  thickness: 0.8,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.075, 3.99),
    prepreg("2116 RC54%", 0.1088),
    core(0.075, 3.99),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06101h1080Stackup = createJlcStackup({
  name: "JLC06101H-1080",
  thickness: 1,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.15, 4.36),
    [
      prepreg("1080 RC67%", 0.0764),
      prepreg("7628 RC49%", 0.218),
      prepreg("1080 RC67%", 0.0764),
    ],
    core(0.15, 4.36),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06101h3313Stackup = createJlcStackup({
  name: "JLC06101H-3313",
  thickness: 1,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.25, 4.23),
    prepreg("7628 RC49%", 0.2028),
    core(0.25, 4.23),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06101h7628Stackup = createJlcStackup({
  name: "JLC06101H-7628",
  thickness: 1,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.1, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.1, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06121h1080Stackup = createJlcStackup({
  name: "JLC06121H-1080",
  thickness: 1.2,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.35, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.35, 4.36),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06121h3313Stackup = createJlcStackup({
  name: "JLC06121H-3313",
  thickness: 1.2,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.35, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.35, 4.36),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06121h7628Stackup = createJlcStackup({
  name: "JLC06121H-7628",
  thickness: 1.2,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.2, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.2, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06161h1080Stackup = createJlcStackup({
  name: "JLC06161H-1080",
  thickness: 1.6,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.55, 4.41),
    prepreg("7628 RC49%", 0.2028),
    core(0.55, 4.41),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06161h2116Stackup = createJlcStackup({
  name: "JLC06161H-2116",
  thickness: 1.6,
  dielectrics: [
    [prepreg("2116 RC57%", 0.127), prepreg("2313 RC58%", 0.0964)],
    core(0.3, 4.56, "S1000-2M"),
    [prepreg("7628 RC50%", 0.2084), prepreg("7628 RC50%", 0.2084)],
    core(0.3, 4.56, "S1000-2M"),
    [prepreg("2313 RC58%", 0.0964), prepreg("2116 RC57%", 0.127)],
  ],
})

export const jlc06161h3313Stackup = createJlcStackup({
  name: "JLC06161H-3313",
  thickness: 1.6,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.55, 4.41),
    prepreg("2116 RC54%", 0.1088),
    core(0.55, 4.41),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06161h7628Stackup = createJlcStackup({
  name: "JLC06161H-7628",
  thickness: 1.6,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.4, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.4, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06181h3313Stackup = createJlcStackup({
  name: "JLC06181H-3313",
  thickness: 1.8,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.5, 4.48),
    [prepreg("7628 RC49%", 0.2104), prepreg("7628 RC49%", 0.2104)],
    core(0.5, 4.48),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06181h7628Stackup = createJlcStackup({
  name: "JLC06181H-7628",
  thickness: 1.8,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.5, 4.48),
    prepreg("7628 RC49%", 0.2028),
    core(0.5, 4.48),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06201h1080Stackup = createJlcStackup({
  name: "JLC06201H-1080",
  thickness: 2,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.7, 4.53),
    [
      prepreg("1080 RC67%", 0.0764),
      prepreg("7628 RC49%", 0.218),
      prepreg("1080 RC67%", 0.0764),
    ],
    core(0.7, 4.53),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc06201h2116Stackup = createJlcStackup({
  name: "JLC06201H-2116",
  thickness: 2,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(0.13, 4.17),
    [
      prepreg("1080 RC67%", 0.0764),
      prepreg("1080 RC67%", 0.084),
      core(1.065, 4.48),
      prepreg("1080 RC67%", 0.084),
      prepreg("1080 RC67%", 0.0764),
    ],
    core(0.13, 4.17),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc06201h3313Stackup = createJlcStackup({
  name: "JLC06201H-3313",
  thickness: 2,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.7, 4.53),
    prepreg("7628 RC49%", 0.2028),
    core(0.7, 4.53),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc06201h7628Stackup = createJlcStackup({
  name: "JLC06201H-7628",
  thickness: 2,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.6, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.6, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06301h2116Stackup = createJlcStackup({
  name: "JLC06301H-2116",
  thickness: 3,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(1.265, 4.42),
    prepreg("2116 RC54%", 0.1088),
    core(1.265, 4.42),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc06301h7628Stackup = createJlcStackup({
  name: "JLC06301H-7628",
  thickness: 3,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(1.065, 4.38),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(1.065, 4.38),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc06351h2116Stackup = createJlcStackup({
  name: "JLC06351H-2116",
  thickness: 3.5,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(1.465, 4.42),
    prepreg("7628 RC49%", 0.2028),
    core(1.465, 4.42),
    prepreg("2116 RC54%", 0.1164),
  ],
})
