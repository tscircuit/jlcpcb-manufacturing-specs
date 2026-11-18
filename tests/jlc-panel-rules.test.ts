import { expect, test } from "bun:test"
import { jlcPanelRules } from "../index"

test("jlcPanelRules matches JLCPCB's published panelization rules", () => {
  expect(jlcPanelRules).toMatchInlineSnapshot(`
    {
      "min_breakaway_tab_width": 4,
      "min_mouse_bite_breakaway_tab_width": 5,
      "min_non_plated_hole_diameter": 0.5,
      "min_panel_board_spacing_with_space": 2,
      "min_tooling_edge_width": 3,
      "min_tooling_edge_width_for_smt_assembly": 5,
      "panel_board_spacing_options": [
        1.6,
        2,
      ],
      "recommended_mouse_bite_diameter": {
        "max": 0.8,
        "min": 0.5,
      },
      "recommended_mouse_bite_spacing": {
        "max": 0.3,
        "min": 0.2,
      },
    }
  `)
})
