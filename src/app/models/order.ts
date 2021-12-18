import { OrderedProduct } from "./orderedProduct";
import { Product } from "./product";

export interface Order{
  id?:string;
  userId:string;
  totalPrice:number;
  addressText:string;
  city:string;
  orderDate:Date;
  products:OrderedProduct[]
}
