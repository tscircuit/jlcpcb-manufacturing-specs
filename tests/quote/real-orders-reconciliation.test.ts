import { expect, test } from "bun:test"
import orders from "../../datasets/jlcpcb/shipped-order-observations.json"
import supplements from "../../datasets/jlcpcb/supplement-observations.json"

test("real shipped PCB costs reconcile while preserving unresolved line items", () => {
  const ids = [...orders, ...supplements].map((row) => row.case_id)
  expect(new Set(ids).size).toBe(ids.length)
  for (const notice of supplements) {
    expect(Number.isFinite(notice.requested_supplement_amount)).toBe(true)
    expect(notice.requested_supplement_amount).toBeGreaterThan(0)
    expect(notice.hole_diameter_mm).toBeLessThan(notice.outer_diameter_mm)
    expect(notice.currency).toBeNull()
    expect(notice.is_final_invoice).toBe(false)
  }
  const cents = (value: number) => Math.round(value * 100)
  for (const order of orders) {
    expect(cents(order.pcb_fabrication_total + order.assembly_total)).toBe(
      cents(order.manufacturing_cost),
    )
    expect(
      cents(
        order.manufacturing_cost +
          order.shipping_cost +
          order.customs_duties_and_taxes_cost +
          order.tax_cost -
          order.discount_cost,
      ),
    ).toBe(cents(order.total_cost))
    expect(
      cents(
        Object.values(order.assembly_breakdown).reduce(
          (sum, value) => sum + value,
          0,
        ) + order.unitemized_assembly_cost,
      ),
    ).toBe(cents(order.assembly_total))
    expect(order.is_final_invoice).toBe(false)
    expect(order.inputs_complete).toBe(false)
  }
  expect(
    orders.find((order) => order.order_suffix === "Y63")
      ?.unitemized_assembly_cost,
  ).toBe(0.86)
})
