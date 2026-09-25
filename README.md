# jlcpcb-manufacturing-specs

Typed JLCPCB manufacturing tolerances for `tscircuit` and `circuit-json`.

This package exports reusable tolerance maps keyed by `PcbBoard` constraint
fields so board rules can be applied consistently in code.

The properties of JLCPCB are referenced from:
https://jlcpcb.com/capabilities/pcb-capabilities

## Install

Install directly from GitHub with Bun:

```bash
bun add github:tscircuit/jlcpcb-manufacturing-specs
```

## Exports

- `jlcMinTolerances`: minimum manufacturing tolerances
- `jlcPreferredTolerances`: more conservative preferred tolerances
- `JlcToleranceMap`: partial map of `PcbBoard` tolerance keys to numeric values

## Usage

```ts
import {
  jlcMinTolerances,
  jlcPreferredTolerances,
  type JlcToleranceMap,
} from "@tscircuit/jlcpcb-manufacturing-specs"

const boardRules: JlcToleranceMap = {
  ...jlcPreferredTolerances,
  min_trace_width: jlcMinTolerances.min_trace_width,
}
```

Use `jlcMinTolerances` when you need the manufacturing floor, and
`jlcPreferredTolerances` when you want safer defaults for new board designs.
