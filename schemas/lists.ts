import { Lists } from ".keystone/types";
import { User } from "./user.schema";
import { Address } from "./address.schema";
import { Cart } from "./cart.schema";
import { Order } from "./order.schema";
import { Payment } from "./payment.schema";
import { ProductImage } from "./productImage.schema";
import { Category } from "./category.schema";
import { ProductReview } from "./productReview.schema";
import { Product } from "./product.schema";

export const lists: Lists = {
  Address,
  Cart,
  Category,
  Order,
  Payment,
  Product,
  ProductImage,
  ProductReview,
  User,
};
