const { Service } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("@sequelize/core");
class ServiceController {
  async create(req, res, next) {
    try {
      const { title, price, typeId, description } = req.body;
      const service = await Service.create({
        title,
        price,
        typeId,
        description,
      });
      return res.json(service);
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  }

  async getAll(req, res) {
    let { typeId, limit, page, query, sortOrder, sortItem } = req.query;
    query = query || "";
    page = page || 1;
    limit = limit || 5;
    let offset = (page - 1) * limit;
    let services;
    if (!typeId && query !== "") {
      services = await Service.findAndCountAll({
        limit,
        offset,
        where: {
          title: {
            [Op.substring]: query,
          },
        },
        order: [[sortItem, sortOrder]],
      });
    } else if (!typeId && query === "") {
      services = await Service.findAndCountAll({
        limit,
        offset,
        order: [[sortItem, sortOrder]],
      });
    } else if (typeId && query !== "") {
      services = await Service.findAndCountAll({
        where: {
          typeId,
          title: {
            [Op.substring]: query,
          },
        },
        limit,
        offset,
        order: [[sortItem, sortOrder]],
      });
    } else {
      services = await Service.findAndCountAll({
        where: { typeId },
        limit,
        offset,
        order: [[sortItem, sortOrder]],
      });
    }

    return res.json(services);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const service = await Service.findOne({
      where: { id },
    });

    return res.json(service);
  }

  async deleteOne(req, res) {
    const { id } = req.params;

    try {
      const result = await Service.destroy({
        where: {id},
        force: true,
      });
      if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Сервис с таким id не найден",
        });
      }

      return res.status(204).json();
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async updateOne(req, res) {
    const { id } = req.params;

    try {
      const result = await Service.update(
        { ...req.body},
        {
          where: {
            id,
          },
        }
      );
  
      if (result[0] === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Сервис с таким id не найден",
        });
      }
  
      const service = await Service.findByPk(id);
  
      return res.json(service);
    } catch (error) {
      next(ApiError.badRequest(err));
    }
  }
}

module.exports = new ServiceController();
