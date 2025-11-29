import Users from "../daos/users.dao.js";
import Products from "../daos/products.dao.js";
import Tickets from "../daos/tickets.dao.js";
import Carts from "../daos/carts.dao.js";
import UsersRepository from "./user.repository.js";
import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import TicketsRepository from "./tickets.repository.js";

const userDAO = new Users();
const productDAO = new Products();
const cartDAO = new Carts();
const ticketDAO = new Tickets();

export const userRepository = new UsersRepository(userDAO);
export const cartRepository = new CartsRepository(cartDAO);
export const productRepository = new ProductsRepository(productDAO);
export const ticketRepository = new TicketsRepository(ticketDAO);