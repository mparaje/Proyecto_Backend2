import CartModel from "../models/Cart.model.js";

export default class Carts {
  getById = (id) => CartModel.findById(id).populate("products.product");
  create = () => CartModel.create({ products: [] });
  update = (id, data) => CartModel.findByIdAndUpdate(id, data, { new: true });
  emptyCart = (id) => CartModel.findByIdAndUpdate(id, { products: [] }, { new: true });
}
