const {News} = require('../models/models');
const path = require("path");
const ApiError = require('../error/ApiError');
const uuid = require('uuid');

class NewsController {
    async create(req, res, next) {
      try {
        const {title, description} = req.body;
        const img = req.file;
        let fileName = img.filename;
        const freshNew = await News.create({title, description, img: fileName})
        return res.json(freshNew);
      } catch (err) {
        next(ApiError.badRequest(err));
      } 
    }

    async getAll(req, res) {
        const news = await News.findAll();
        return res.json(news);
    }

    async getOne(req, res) {
      const { id } = req.params;
      const service = await News.findOne({
        where: { id },
      });
  
      return res.json(service);
    }

    async getLastNew(req, res) {
      const news = await News.findAll({
        order: [['createdAt', 'desc']]
      })
      return res.json(news[0]);
    }
}

module.exports = new NewsController()