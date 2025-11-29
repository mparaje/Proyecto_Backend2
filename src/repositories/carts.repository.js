export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getById = (id) => this.dao.getById(id);
  create = () => this.dao.create();

  addProduct = async (cartId, productId, quantity) => {
    const cart = await this.dao.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const existingProduct = cart.products.find(p => p.product?._id?.toString() === productId || p.product?.toString?.() === productId);

    if (existingProduct) {
      existingProduct.quantity+= quantity;
    } else {
      cart.products.push({ product: productId, quantity});
    }

    return await cart.save();
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    const cart = await this.dao.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const item = cart.products.find(
      p =>
        p.product?._id?.toString() === productId ||
        p.product?.toString?.() === productId
    );

    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    item.quantity = quantity; 

    return await cart.save();
  };

  removeProduct = async (cartId, productId) => {
    const cart = await this.dao.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      p =>
        p.product?._id?.toString() !== productId &&
        p.product?.toString?.() !== productId
    );

    if (cart.products.length === initialLength) {
      throw new Error("Producto no encontrado en el carrito");
    }

    return await cart.save();
  };

  emptyCart = (cartId) => this.dao.emptyCart(cartId);
}
