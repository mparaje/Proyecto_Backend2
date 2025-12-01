import { cartRepository, productRepository, ticketRepository } from "../repositories/index.js";

class CartsController {
  getById = async (req, res) => {
    try {
      const cart = await cartRepository.getById(req.params.cid);
      if (!cart) return res.status(404).json({ error: "Cart not found" });
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const cart = await cartRepository.create();
      res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      let { quantity } = req.body

      quantity = parseInt(quantity) || 1;

      const product = await productRepository.getById(pid);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });

      const updatedCart = await cartRepository.addProduct(cid, pid, quantity);

      res.json({ status: "success", payload: updatedCart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const result = await cartRepository.emptyCart(req.params.cid);
      res.json({ status: "success", payload: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 1)
        return res.status(400).json({ error: "Cantidad inválida" });

      const cart = await cartRepository.updateProductQuantity(cid, pid, quantity);

      if (!cart) return res.status(404).json({ error: "Producto no encontrado en carrito" });

      res.json({ message: "Cantidad actualizada", payload: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  removeProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await cartRepository.removeProduct(cid, pid);

      if (!cart) return res.status(404).json({ error: "Producto no encontrado en carrito" });

      res.json({ message: "Producto eliminado", payload: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  purchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const userEmail = req.user.email; // viene del JWT
      const cart = await cartRepository.getById(cid);

      if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

      if (!cart.products || cart.products.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "No se puede realizar la compra. El carrito está vacío."
        });
      }

      let total = 0;

      for (const item of cart.products) {
        total += item.product.price * item.quantity;
      }

      // Crear ticket
      const ticket = await ticketRepository.purchase(
        userEmail, 
        total, 
        cart.products.map(p => ({
          productId: p.product._id || p.product,
          quantity: p.quantity,
          unitPrice: p.product.price
      })));

      // Vaciar carrito
      await cartRepository.emptyCart(cid);

      res.json({
        status: "success",
        payload: ticket,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new CartsController();
