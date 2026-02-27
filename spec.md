# Specification

## Summary
**Goal:** Remove the visible admin password hint from the login form, update the hardcoded password to "namita6565", and fix the Add Product functionality in the admin dashboard.

**Planned changes:**
- Remove all visible password display (labels, info boxes, hints) from `AdminLoginForm.tsx`
- Change the hardcoded password check from `'knots2024'` to `'namita6565'`
- Fix the `createProduct` mutation in `useQueries.ts` to correctly call the backend `addProduct` method
- Fix the backend Motoko actor's `addProduct` function to correctly store new products
- Fix `ProductFormModal` / `ProductsTab` to invoke the mutation and refresh the product list after successful creation

**User-visible outcome:** The admin login page no longer displays the password, and logging in with "namita6565" works. Admins can successfully add new products via the Add Product modal, with the new product appearing in the table immediately after creation.
