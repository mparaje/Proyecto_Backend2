import { productRepository } from "../repositories/index.js";

class ProductsController {
  getAll = async (req, res) => {
    try {
      const products = await productRepository.getAll();
      res.json({ status: "success", payload: products });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const product = await productRepository.getById(req.params.pid);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json({ status: "success", payload: product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const newProduct = await productRepository.create(req.body);
      res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const updated = await productRepository.update(req.params.pid, req.body);
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await productRepository.delete(req.params.pid);
      res.json({ status: "success", message: "Product deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new ProductsController();
