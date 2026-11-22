# JLCPCB quote estimates and the 5% target

The initial implementation supports USD quotes only (two-decimal monetary rounding).
Other currencies must be converted by a separately dated FX layer or rejected.

The initial implementation composes dated supplier evidence into the published
`PcbQuoteEstimate` / `pcb_quote_estimate` format from `circuit-json@0.0.536`. It is **not yet a calibrated price predictor** and
no 5% accuracy claim is made. There is no guessed fabrication formula or global
Kelvin fee. The exact PCB revision and all manufacturing options must match the
supplier quote; country alone does not establish duty or shipping cost.

Supply `material: "fr4"` and a `quote_request_hash` (SHA-256 of the exact
supplier request including revision, files and every manufacturing/delivery option)
on both the input and supplier evidence. A mismatched request cannot be reused.

Use `estimateJlcpcbQuote(input, evidence)` with disjoint line-item totals for the
whole order, not per-board costs. Include each charge exactly once. Inapplicable
charges are explicit zero; unknown charges are omitted. A missing manufacturing
fee suppresses manufacturing and landed totals. Missing shipping, duty, tax or
brokerage suppresses landed totals. Import tax/duty evidence must be dated and
appropriate to destination, origin, customs classification, declared value and
shipping terms. Do not ship guessed tariff percentages as defaults.

The precision-via rule applies only to rigid FR4. The 0.2mm drill / 0.45mm pad
exception is multilayer-only. Matching is per via so minima from different vias
are never combined into a fictitious geometry. Supplier rules can change; verify
against https://cart.jlcpcb.com/quote and
https://jlcpcb.com/help/article/in-what-cases-will-there-be-charged-extra .
Do not add small-hole or Kelvin fees twice if already included by the supplier.
Other review-dependent costs include filled/capped via-in-pad, ENIG coverage,
nonstandard slots, baking, manual assembly, inspection and panelization. These
must be quoted or remain unknown.

## Validation contract

Use `evaluateQuotePredictions(cases, predictions)` on frozen final-invoice data.
It reports separate relative errors for manufacturing, shipping, combined customs duties/import tax, non-import sales tax,
brokerage and landed total. Every held-out board must be within 5% for every
metric. Zero actual requires zero prediction. Missing predictions, unresolved
cost breakdowns, currency mismatch, no held-out cases and non-final invoices
cannot pass. Duplicate IDs and calibration/validation revision leakage throw.

To establish coverage, collect ordinary 2/4/6-layer boards, larger boards,
multiple quantities, precision vias, via-in-pad, single/double-sided assembly,
basic/extended parts, and several destinations/services. Freeze PCB inputs,
Gerbers/BOM/PnP revisions, order options, dated quote, final invoice, shipping
invoice and every supplement/refund. Assign all quantities/variants of one board
revision to one split. Hold out boards before tuning; do not fit on validation
invoice totals. Report counts and worst per-board error, not only average error.

The approved real order and surcharge observations are in `datasets/jlcpcb/`,
with accounting reconciliation and unresolved details documented in its README.
They are not yet final-invoice benchmark labels: exact revisions and final costs
still need reconciliation. No pre-order prediction results have been published.
The next integration is a live supplier-quote adapter and a final-invoice
validation corpus; the legacy registry quote pipeline was removed.

Use `customs_duties_and_taxes_cost` when the supplier only provides a combined
import amount. Alternatively use both `duties_cost` and `import_tax_cost`; never
combine both representations. `tax_cost` means domestic sales tax/VAT, excluding
import taxes. Shipping, customs and sales tax must stay separately displayed.
