import ProductModel from "../models/Product.model.js";

export default class Products {
  getAll = () => ProductModel.find();
  getById = (id) => ProductModel.findById(id);
  create = (data) => ProductModel.create(data);
  update = (id, data) => ProductModel.findByIdAndUpdate(id, data, { new: true });
  delete = (id) => ProductModel.findByIdAndDelete(id);
}
