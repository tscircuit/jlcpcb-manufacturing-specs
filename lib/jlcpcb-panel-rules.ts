/** A recommended range, in mm. */
export interface JlcRange {
  min: number
  max: number
}

/**
 * JLCPCB panelization rules in mm, from
 * https://jlcpcb.com/capabilities/pcb-capabilities
 */
export interface JlcPanelRules {
  /** Smallest non-plated hole, which includes mouse-bite drills. */
  min_non_plated_hole_diameter: number
  /** Recommended mouse-bite drill diameter. */
  recommended_mouse_bite_diameter: JlcRange
  /** Recommended spacing between two mouse-bite drills. */
  recommended_mouse_bite_spacing: JlcRange
  /** Narrowest breakaway tab. */
  min_breakaway_tab_width: number
  /** Narrowest breakaway tab that carries mouse bites. */
  min_mouse_bite_breakaway_tab_width: number
  /** Board-to-board spacing options for a panel. */
  panel_board_spacing_options: readonly number[]
  /** Smallest board-to-board spacing when the panel leaves space between boards. */
  min_panel_board_spacing_with_space: number
  /** Narrowest tooling edge (rail). */
  min_tooling_edge_width: number
  /** Narrowest tooling edge (rail) for SMT assembly. */
  min_tooling_edge_width_for_smt_assembly: number
}

export const jlcPanelRules: JlcPanelRules = {
  min_non_plated_hole_diameter: 0.5,
  recommended_mouse_bite_diameter: { min: 0.5, max: 0.8 },
  recommended_mouse_bite_spacing: { min: 0.2, max: 0.3 },
  min_breakaway_tab_width: 4,
  min_mouse_bite_breakaway_tab_width: 5,
  panel_board_spacing_options: [1.6, 2],
  min_panel_board_spacing_with_space: 2,
  min_tooling_edge_width: 3,
  min_tooling_edge_width_for_smt_assembly: 5,
}
