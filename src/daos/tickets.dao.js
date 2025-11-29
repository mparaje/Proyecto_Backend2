import TicketModel from "../models/Ticket.model.js";

export default class Tickets {
  create = (data) => TicketModel.create(data);
  getByCode = (code) => TicketModel.findOne({ code });
}