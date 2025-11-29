import { v4 as uuid } from "uuid";

export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  purchase = async (userEmail, amount) => {
    const ticketData = {
      code: uuid(),
      purchase_datetime: new Date(),
      amount,
      purchaser: userEmail,
    };

    return await this.dao.create(ticketData);
  };
}
