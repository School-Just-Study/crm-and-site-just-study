import { Lists } from ".keystone/types";
import { User } from "./user.schema";
import { Address } from "./address.schema";
import { Cart } from "./card.schema";
import { Order } from "./order.schema";
import { Payment } from "./payment.schema";
import { ProductImage } from "./productImage.schema";
import { Category } from "./category.schema";

export const lists: Lists = {
  User,
  Address,
  Cart,
  Order,
  Payment,
  ProductImage,
  Category,
};
