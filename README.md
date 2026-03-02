## API Endpoints

### Auth Routes

   POST `/api/auth/register` – Register a new user (name, email, password, phone, role_id)

   POST `/api/auth/login` – Login with email and password, returns JWT token


### User Profile Routes (Auth Required)

   GET `/api/me` – Get logged-in user details

   PUT `/api/update-me` – Update logged-in user details


### Admin – User Management (ADMIN Only)

   GET `/api/get-users` – Get all users

   GET `/api/get-users-by-id/:id` – Get user details by ID

   PATCH `/api/update-users-role/:id/role` – Update user role

   PATCH `/api/update-users-status/:id/status` – Enable or disable user

   DELETE `/api/delete-user/:id` – Delete user

### Category Routes

   POST `/api/add-category` – Create category (ADMIN)

   GET `/api/get-category` – Get all categories

   PUT `/api/update-category/:id` – Update category (ADMIN)

   DELETE `/api/delete-category/:id` – Delete category (ADMIN)


### Address Routes (Auth Required)

   POST `/api/add-addresses` – Add address

   GET `/api/get-addresses` – Get user addresses

   PUT `/api/update-addresses/:id` – Update address

   DELETE `/api/delete-addresses/:id` – Delete address


### Product Routes

   POST `/api/add-products` – Create product (VENDOR)

   GET `/api/get-product-by-category/:category_id/products` – Get products by category

   GET `/api/get-product/:id` – Get product details

   PUT `/api/update-product/:id` – Update product (VENDOR / ADMIN)

   DELETE `/api/delete-product/:id` – Delete product (VENDOR / ADMIN)


### Product Variant Routes

   POST `/api/add-variants` – Create product variant (VENDOR)


### Inventory Routes

   POST `/api/add-inventory` – Set inventory for product variant (VENDOR)

   GET `/api/get-inventory-by-product/:productId` – Get inventory by product

   PUT `/api/update-inventory/:id` – Update inventory (VENDOR / ADMIN)


### Cart Routes (CUSTOMER)

   POST `/api/add-cart` – Add item to cart

   GET `/api/get-cart` – Get cart details

   PUT `/api/update-cart-item/:id` – Update cart item quantity


### Order Routes

   POST `/api/orders/checkout` – Place order from cart

   GET `/api/get-my-orders` – Get logged-in user orders

   GET `/api/get-vendor-orders/vendor` – Get vendor orders (VENDOR)

   GET `/api/get-orders-details/:id` – Get order details

   PATCH `/api/update-order-status/:id/status` – Update order status (VENDOR / ADMIN)
