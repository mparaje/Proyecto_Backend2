import TicketModel from "../models/Ticket.model.js";

export default class Tickets {
  create = (data) => TicketModel.create(data);
  getByCode = async (code) => {return await TicketModel.findOne({ code })};
}