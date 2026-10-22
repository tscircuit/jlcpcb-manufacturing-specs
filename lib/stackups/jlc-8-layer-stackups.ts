import { core, createJlcStackup, prepreg } from "../jlc-stackup-builders"

export const jlc08081h1080Stackup = createJlcStackup({
  name: "JLC08081H-1080",
  thickness: 0.8,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.075, 3.99),
    prepreg("2116 RC54%", 0.1088),
    core(0.075, 3.99),
    prepreg("2116 RC54%", 0.1088),
    core(0.075, 3.99),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08101h1080Stackup = createJlcStackup({
  name: "JLC08101H-1080",
  thickness: 1,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.1, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.1, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.1, 4.36),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08101h3313Stackup = createJlcStackup({
  name: "JLC08101H-3313",
  thickness: 1,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.13, 4.17),
    prepreg("2116 RC54%", 0.1088),
    core(0.13, 4.17),
    prepreg("2116 RC54%", 0.1088),
    core(0.13, 4.17),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08121h1080Stackup = createJlcStackup({
  name: "JLC08121H-1080",
  thickness: 1.2,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.13, 4.17),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.13, 4.17),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.13, 4.17),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08121h3313Stackup = createJlcStackup({
  name: "JLC08121H-3313",
  thickness: 1.2,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.2, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.2, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.2, 4.36),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08121h7628Stackup = createJlcStackup({
  name: "JLC08121H-7628",
  thickness: 1.2,
  dielectrics: [
    prepreg("7628 RC50%", 0.2084),
    core(0.13, 4.03, "S1000-2M"),
    prepreg("2116 RC54%", 0.1088),
    core(0.13, 4.03, "S1000-2M"),
    prepreg("2116 RC54%", 0.1088),
    core(0.13, 4.03, "S1000-2M"),
    prepreg("7628 RC50%", 0.2084),
  ],
})

export const jlc08141h1080Stackup = createJlcStackup({
  name: "JLC08141H-1080",
  thickness: 1.4,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.3, 4.41),
    prepreg("3313 RC57%", 0.0918),
    core(0.3, 4.41),
    prepreg("3313 RC57%", 0.0918),
    core(0.3, 4.41),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08141h3313Stackup = createJlcStackup({
  name: "JLC08141H-3313",
  thickness: 1.4,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.075, 3.99),
    prepreg("3313 RC57%", 0.0918),
    core(0.7, 4.53),
    prepreg("3313 RC57%", 0.0918),
    core(0.075, 3.99),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08141h7628Stackup = createJlcStackup({
  name: "JLC08141H-7628",
  thickness: 1.4,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.13, 4.17),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.13, 4.17),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.13, 4.17),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc08161h1080Stackup = createJlcStackup({
  name: "JLC08161H-1080",
  thickness: 1.6,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.3, 4.41),
    prepreg("7628 RC49%", 0.2028),
    core(0.3, 4.41),
    prepreg("7628 RC49%", 0.2028),
    core(0.3, 4.41),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08161h2116Stackup = createJlcStackup({
  name: "JLC08161H-2116",
  thickness: 1.6,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(0.3, 4.41),
    [prepreg("1080 RC67%", 0.0764), prepreg("1080 RC67%", 0.0764)],
    core(0.3, 4.41),
    [prepreg("1080 RC67%", 0.0764), prepreg("1080 RC67%", 0.0764)],
    core(0.3, 4.41),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc08161h2313Stackup = createJlcStackup({
  name: "JLC08161H-2313",
  thickness: 1.6,
  dielectrics: [
    prepreg("2313 RC58%", 0.0964),
    core(0.13, 4.03, "S1000-2M"),
    [prepreg("7628 RC50%", 0.2084), prepreg("2313 RC58%", 0.0964)],
    core(0.3, 4.56, "S1000-2M"),
    [prepreg("2313 RC58%", 0.0964), prepreg("7628 RC50%", 0.2084)],
    core(0.13, 4.03, "S1000-2M"),
    prepreg("2313 RC58%", 0.0964),
  ],
})

export const jlc08161h3313Stackup = createJlcStackup({
  name: "JLC08161H-3313",
  thickness: 1.6,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.1, 4.36),
    [
      prepreg("2116 RC54%", 0.1164),
      prepreg("2116 RC54%", 0.124),
      prepreg("2116 RC54%", 0.1164),
    ],
    core(0.3, 4.41),
    [
      prepreg("2116 RC54%", 0.1164),
      prepreg("2116 RC54%", 0.124),
      prepreg("2116 RC54%", 0.1164),
    ],
    core(0.1, 4.36),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08161h7628Stackup = createJlcStackup({
  name: "JLC08161H-7628",
  thickness: 1.6,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.2, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.2, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.2, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc08181h3313Stackup = createJlcStackup({
  name: "JLC08181H-3313",
  thickness: 1.8,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.45, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.3, 4.41),
    prepreg("2116 RC54%", 0.1088),
    core(0.45, 4.36),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08201h106Stackup = createJlcStackup({
  name: "JLC08201H-106",
  thickness: 2,
  dielectrics: [
    [prepreg("106 RC72%", 0.05), prepreg("106 RC72%", 0.0424)],
    core(0.45, 4.36),
    [prepreg("106 RC72%", 0.0424), prepreg("106 RC72%", 0.0424)],
    core(0.45, 4.36),
    [prepreg("106 RC72%", 0.0424), prepreg("106 RC72%", 0.0424)],
    core(0.45, 4.36),
    [prepreg("106 RC72%", 0.0424), prepreg("106 RC72%", 0.05)],
  ],
})

export const jlc08201h1080Stackup = createJlcStackup({
  name: "JLC08201H-1080",
  thickness: 2,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.4, 4.36),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.4, 4.36),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.4, 4.36),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08201h2116Stackup = createJlcStackup({
  name: "JLC08201H-2116",
  thickness: 2,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(0.3, 4.41),
    [prepreg("2116 RC54%", 0.1164), prepreg("7628 RC49%", 0.2104)],
    core(0.3, 4.41),
    [prepreg("7628 RC49%", 0.2104), prepreg("2116 RC54%", 0.1164)],
    core(0.3, 4.41),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc08201h3313Stackup = createJlcStackup({
  name: "JLC08201H-3313",
  thickness: 2,
  dielectrics: [
    prepreg("3313 RC57%", 0.0994),
    core(0.45, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.45, 4.36),
    prepreg("2116 RC54%", 0.1088),
    core(0.45, 4.36),
    prepreg("3313 RC57%", 0.0994),
  ],
})

export const jlc08201h7628Stackup = createJlcStackup({
  name: "JLC08201H-7628",
  thickness: 2,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.35, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.35, 4.36),
    prepreg("7628 RC49%", 0.2028),
    core(0.35, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc08251h7628Stackup = createJlcStackup({
  name: "JLC08251H-7628",
  thickness: 2.5,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.5, 4.48),
    prepreg("7628 RC49%", 0.2028),
    core(0.5, 4.48),
    prepreg("7628 RC49%", 0.2028),
    core(0.5, 4.48),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc08301h1080Stackup = createJlcStackup({
  name: "JLC08301H-1080",
  thickness: 3,
  dielectrics: [
    prepreg("1080 RC67%", 0.0764),
    core(0.5, 4.48),
    prepreg("3313 RC57%", 0.0918),
    core(1.465, 4.42),
    prepreg("3313 RC57%", 0.0918),
    core(0.5, 4.48),
    prepreg("1080 RC67%", 0.0764),
  ],
})

export const jlc08301h2116Stackup = createJlcStackup({
  name: "JLC08301H-2116",
  thickness: 3,
  dielectrics: [
    prepreg("2116 RC54%", 0.1164),
    core(0.7, 4.53),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.7, 4.53),
    [prepreg("2116 RC54%", 0.1164), prepreg("2116 RC54%", 0.1164)],
    core(0.7, 4.53),
    prepreg("2116 RC54%", 0.1164),
  ],
})

export const jlc08301h7628Stackup = createJlcStackup({
  name: "JLC08301H-7628",
  thickness: 3,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.665, 4.4),
    prepreg("7628 RC49%", 0.2028),
    core(0.665, 4.4),
    prepreg("7628 RC49%", 0.2028),
    core(0.665, 4.4),
    prepreg("7628 RC49%", 0.2104),
  ],
})

export const jlc08321h7628Stackup = createJlcStackup({
  name: "JLC08321H-7628",
  thickness: 3.2,
  dielectrics: [
    prepreg("7628 RC49%", 0.2104),
    core(0.6, 4.36),
    [prepreg("7628 RC50%", 0.2084), prepreg("7628 RC49%", 0.2104)],
    core(0.6, 4.36),
    [prepreg("7628 RC49%", 0.2104), prepreg("7628 RC49%", 0.2104)],
    core(0.6, 4.36),
    prepreg("7628 RC49%", 0.2104),
  ],
})
