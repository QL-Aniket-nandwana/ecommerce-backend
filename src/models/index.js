const sequelize = require("../configs/database");

const Role = require("./Role");
const User = require("./User");
const UserDetail = require("./UserDetail");
const Address = require("./Address");
const Category = require("./Category");
const Product = require("./Product");
const ProductVariant = require("./ProductVariant");
const Inventory = require("./Inventory");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

User.hasOne(UserDetail, {
    foreignKey: "user_id",
    as: "details",
});
UserDetail.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Address, {
    foreignKey: "user_id",
    as: "addresses",
});
Address.belongsTo(User, {
    foreignKey: "user_id",
});

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Product, { foreignKey: 'vendor_id' });
Product.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });

Product.hasMany(ProductVariant, { foreignKey: 'product_id', as: 'variants' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

ProductVariant.hasOne(Inventory, { foreignKey: 'product_variant_id' });
Inventory.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });


User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

ProductVariant.hasMany(CartItem, {
    foreignKey: 'product_variant_id',
});
CartItem.belongsTo(ProductVariant, {
    foreignKey: 'product_variant_id',
});


User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'items',
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
});

ProductVariant.hasMany(OrderItem, {
    foreignKey: 'product_variant_id',
});
OrderItem.belongsTo(ProductVariant, {
    foreignKey: 'product_variant_id',
});

module.exports = {
    sequelize,
    Role,
    User,
    UserDetail,
    Address,
    Category,
    Product,
    ProductVariant,
    Inventory,
    Cart,
    CartItem,
    Order,
    OrderItem,
};