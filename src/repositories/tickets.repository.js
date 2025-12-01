import { v4 as uuid } from "uuid";

export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  purchase = async (userEmail, amount, products) => {
    const ticketData = {
      code: uuid(),
      purchase_datetime: new Date(),
      amount,
      purchaser: userEmail,
      products
    };

    return await this.dao.create(ticketData);
  };

  getByCode = async (code) => {
    return await this.dao.getByCode(code);
  };
}
