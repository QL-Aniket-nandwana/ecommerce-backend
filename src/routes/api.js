const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const authMiddleware = require("../app/middleware/authMiddleware");
const UserController = require('../app/controllers/UserController');
const AdminUserController = require('../app/controllers/AdminUserController');
const CategoryController = require('../app/controllers/CategoryController');
const AddressController = require('../app/controllers/AddressController');
const ProductController = require('../app/controllers/ProductController');
const ProductVariantController = require('../app/controllers/ProductVariantController');
const InventoryController = require('../app/controllers/InventoryController');
const CartController = require('../app/controllers/CartController');
const OrderController = require('../app/controllers/OrderController');
const authorizeRoles = require('../app/middleware/roleMiddleware');
const roles = require("../utils/roles");

router.post("/auth/register", registerValidator, authController.register);
router.post("/auth/login", loginValidator, authController.login);

// Profile

router.get(
    '/me',
    authMiddleware,
    UserController.getMe
  );
  
  router.put(
    '/update-me',
    authMiddleware,
    UserController.updateMe
  );

//   admin api

router.get(
    '/get-users',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    AdminUserController.getUsers
  );
  
  router.get(
    '/get-users-by-id/:id',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    AdminUserController.getUser
  );
  
  router.patch(
    '/update-users-role/:id/role',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    AdminUserController.updateUserRole
  );
  
  router.patch(
    '/update-users-status/:id/status',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    AdminUserController.updateUserStatus
  );
  
  router.delete(
    '/delete-user/:id',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    AdminUserController.deleteUser
  );

//category

router.post(
    '/add-category',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    CategoryController.createCategory
);

router.get('/get-category', CategoryController.getCategories);

router.put(
    '/update-category/:id',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    CategoryController.updateCategory
);

router.delete(
    '/delete-category/:id',
    authMiddleware,
    authorizeRoles(roles.ADMIN),
    CategoryController.deleteCategory
);


// address

router.post('/add-addresses/', authMiddleware, AddressController.createAddress);
router.get('/get-addresses/', authMiddleware, AddressController.getAddresses);
router.put('/update-addresses/:id', authMiddleware, AddressController.updateAddress);
router.delete('/delete-addresses/:id', authMiddleware, AddressController.deleteAddress);

// products

router.post(
    '/add-products',
    authMiddleware,
    authorizeRoles(roles.VENDOR),
    ProductController.createProduct
);

router.get(
    '/get-product-by-category/:category_id/products',
    ProductController.getProductsByCategory
);

router.get('/get-product/:id', ProductController.getProduct);

router.put(
  '/update-product/:id',
  authMiddleware,
  authorizeRoles(roles.VENDOR, roles.ADMIN),
  ProductController.updateProduct
);

router.delete(
  '/delete-product/:id',
  authMiddleware,
  authorizeRoles(roles.VENDOR, roles.ADMIN),
  ProductController.deleteProduct
);

//   product varients

router.post(
    '/add-variants/',
    authMiddleware,
    authorizeRoles(roles.VENDOR),
    ProductVariantController.createVariant
);


//   Inventory
router.post(
    '/add-inventory/',
    authMiddleware,
    authorizeRoles(roles.VENDOR),
    InventoryController.setInventory
);

router.get(
    '/get-inventory-by-product/:productId',
    InventoryController.getInventoryByProduct
  );
  
  router.put(
    '/update-inventory/:id',
    authMiddleware,
    authorizeRoles(roles.VENDOR, roles.ADMIN),
    InventoryController.updateInventory
  );

//   cart

router.post(
    '/add-cart',
    authMiddleware,
    authorizeRoles(roles.CUSTOMER),
    CartController.addToCart
);

router.get(
    '/get-cart/',
    authMiddleware,
    authorizeRoles(roles.CUSTOMER),
    CartController.getCart
);

router.put(
    '/update-cart-item/:id',
    authMiddleware,
    authorizeRoles(roles.CUSTOMER),
    CartController.updateCartItem
);

//   order

router.post(
    '/orders/checkout',
    authMiddleware,
    OrderController.checkout
);

router.get(
    '/get-my-orders/',
    authMiddleware,
    OrderController.getMyOrders
);


router.get(
    '/get-vendor-orders/vendor',
    authMiddleware,
    authorizeRoles(roles.VENDOR),
    OrderController.getVendorOrders
);

router.get(
    '/get-orders-details/:id',
    authMiddleware,
    OrderController.getOrderDetails
);

router.patch(
    '/update-order-status/:id/status',
    authMiddleware,
    authorizeRoles(roles.VENDOR, roles.ADMIN),
    OrderController.updateOrderStatus
);

module.exports = router;