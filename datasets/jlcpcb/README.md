# JLCPCB price observations

Seed corpus for evaluating PCB quote predictions against real manufacturing orders.
These records are observations, not yet a final-invoice validation dataset.

| File | Records | Source |
| --- | ---: | --- |
| `shipped-order-observations.json` | 2 | Shipped-order details and assembly price tooltips |
| `supplement-observations.json` | 4 | Additional-charge email notices |

The normalized specifications and costs were approved for public publication by
the account owner. Customer/account identifiers, names, email recipients, addresses,
payment details, tracking numbers, signed URLs and raw email bodies are omitted.
Order suffixes connect related observations without retaining the customer number.

## Cost conventions

Amounts cover the entire order, not one PCB. Fabricated quantity and assembled
quantity are separate: both shipped records have five bare PCBs and two assembled
PCBs. Shipped-order amounts are USD. Supplement notice currency remains `null`
because the notices did not state it; do not infer USD from a related order.

`manufacturing_cost` is the gross sum of bare-PCB and assembly totals.
`discount_cost` is a positive deduction. The landed total is manufacturing plus
shipping, customs duties/import taxes, and sales tax, minus the discount.
`customs_duties_and_taxes_cost` preserves the supplier's combined import amount;
`tax_cost` is separately displayed domestic sales tax. Missing import-duty,
import-tax and brokerage breakdowns must not become zero-valued labels.

Assembly breakdowns retain named supplier fees. `unitemized_assembly_cost` is
the difference between the listed fee sum and the supplier's assembly total.
The Y63 record preserves an unexplained $0.86 instead of attributing it to a
made-up fee. Y45 gross merchandise of $288.92 less a $9 discount explains the
$279.92 net merchandise shown in the order list.

Supplement amounts are requested adjustments, not proof of payment. Multiple
notices bundle Kelvin testing with duty/VAT and sometimes shipping. Never use the
entire requested adjustment as the Kelvin fee. Y45's $54.18 notice and its
$74.78 total PCB supplement are overlapping observations, not additive charges.
The `mentions_*` flags describe notice wording; false does not establish that a
fee was absent. Likewise, `contains_kelvin_test` identifies the notice reason,
not an isolated or reconciled Kelvin cost.

## Eligibility for the 5% benchmark

Every record remains `is_final_invoice: false`. The shipped records also have
`inputs_complete: false` and `board_revision: null`. Supplier display dates have
no inferred timezone, and option groups must not be treated as exact Gerber geometry.

Before using these as calibration or held-out validation cases:

1. Resolve exact PCB/Gerber, BOM and CPL revisions and every order option.
2. Reconcile final invoices, discounts, supplements, refunds and delivery charges.
3. Resolve unknown currency, fee breakdowns and the recorded residual.
4. Capture a prediction made without access to its final invoice labels.
5. Keep all variants of a board revision in one calibration/validation split.

The tests check accounting consistency and preserve unresolved observations.
Passing them does **not** demonstrate prediction accuracy within 5%.
