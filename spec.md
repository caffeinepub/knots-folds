# Specification

## Summary
**Goal:** Add an interactive order placement system, a password-protected admin panel, and a customer feedback form to the Knots & Folds website, backed by extended Motoko backend logic.

**Planned changes:**
- Add an order form (name, phone, delivery address, product selection, quantity) accessible from the product showcase, storing orders in the backend with a timestamp and "Pending" status.
- Add a password-protected `/admin` route (not linked in public nav) with tabbed sections: Products, Orders, and Feedback.
  - Products tab: view, add, edit, and delete products (name, description, price, stock quantity, image URL, category).
  - Orders tab: view all orders with customer details and a control to update order status (Pending, Processing, Shipped, Delivered, Cancelled).
  - Feedback tab: view all submitted feedback messages (name, email, message, timestamp).
- Admin session persisted via localStorage for the browser session.
- Update the ContactSection form to collect name, email, and message as customer feedback, store submissions in the backend, and display vanshita310@gmail.com as the business contact email.
- Extend the Motoko backend actor with stable variables and methods for: product CRUD (`addProduct`, `editProduct`, `deleteProduct`, `listProducts`, `getProduct`), order management (`placeOrder`, `listOrders`, `updateOrderStatus`), and feedback (`submitFeedback`/reuse existing, `listFeedback`).

**User-visible outcome:** Customers can place product orders and leave feedback messages directly on the site. The store owner can log in to `/admin` to manage products, track and update order statuses, and read all customer feedback messages.
