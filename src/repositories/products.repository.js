export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => await this.dao.getAll();
  getById = async (id) => await this.dao.getById(id);

  create = async (data) => {
    if (!data.title || !data.price) throw new Error("Missing fields");
    return await this.dao.create(data);
  };

  update = async (id, data) => await this.dao.update(id, data);
  delete = async (id) => await this.dao.delete(id);
}
