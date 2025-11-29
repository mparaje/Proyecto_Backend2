import { ticketRepository } from "../repositories/index.js";

class TicketsController {
  getByCode = async (req, res) => {
    try {
      const ticket = await ticketRepository.getByCode(req.params.code);
      if (!ticket) return res.status(404).json({ error: "Ticket not found" });
      res.json({ status: "success", payload: ticket });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new TicketsController();
