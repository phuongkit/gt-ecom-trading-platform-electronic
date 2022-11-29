package gt.electronic.ecommerce.models.enums;

/**
 * @author minh phuong
 * @created 17/09/2022 - 10:11 PM
 * @project gt-backend
 */
public enum EOrderStatus {
  ORDER_PENDING,
  ORDER_AWAITING_PAYMENT,
  ORDER_AWAITING_FULFILLMENT,
  ORDER_AWAITING_SHIPMENT,
  ORDER_AWAITING_PICKUP,
  ORDER_PARTIALLY_SHIPPED,
  ORDER_COMPLETED,
  ORDER_SHIPPED,
  ORDER_CANCELLED,
  ORDER_DECLINED,
  ORDER_REFUNDED,
  ORDER_DISPUTED,
  ORDER_MANUAL_VERIFICATION_REQUIRED,
  ORDER_PARTIALLY_REFUNDED

  //  Pending — Customer started the checkout process but did not complete it. Incomplete orders are
  // assigned a "Pending" status and can be found under the More tab in the View Orders screen.
  //  Awaiting Payment — Customer has completed the checkout process, but payment has yet to be
  // confirmed. Authorize only transactions that are not yet captured have this status.
  //  Awaiting Fulfillment — Customer has completed the checkout process and payment has been
  // confirmed.
  //  Awaiting Shipment — Order has been pulled and packaged and is awaiting collection from a
  // shipping provider.
  //  Awaiting Pickup — Order has been packaged and is awaiting customer pickup from a
  // seller-specified location.
  //  Partially Shipped — Only some items in the order have been shipped.
  //  Completed — Order has been shipped/picked up, and receipt is confirmed; client has paid for
  // their digital product, and their file(s) are available for download.
  //  Shipped — Order has been shipped, but receipt has not been confirmed; seller has used the Ship
  // Items action. A listing of all orders with a "Shipped" status can be found under the More tab
  // of the View Orders screen.
  //  Cancelled — Seller has cancelled an order, due to a stock inconsistency or other reasons.
  // Stock levels will automatically update depending on your Inventory Settings. Cancelling an
  // order will not refund the order. This status is triggered automatically when an order using an
  // authorize-only payment gateway is voided in the control panel before capturing payment.
  //  Declined — Seller has marked the order as declined.
  //  Refunded — Seller has used the Refund action to refund the whole order. A listing of all
  // orders with a "Refunded" status can be found under the More tab of the View Orders screen.
  //  Disputed — Customer has initiated a dispute resolution process for the PayPal transaction that
  // paid for the order or the seller has marked the order as a fraudulent order.
  //  Manual Verification Required — Order on hold while some aspect, such as tax-exempt
  // documentation, is manually confirmed. Orders with this status must be updated manually.
  // Capturing funds or other order actions will not automatically update the status of an order
  // marked Manual Verification Required.
  //  Partially Refunded — Seller has partially refunded the order.
}
