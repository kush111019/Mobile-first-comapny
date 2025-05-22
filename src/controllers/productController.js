const { Product } = require('../models');
const redisClient = require('../config/redis');
const { Op } = require('sequelize');
const { applyPagination } = require('../utils/pagination');

exports.getProducts = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      isAvailable,
      page,
      limit,
      sortBy = 'createdAt',
      order = 'DESC'
    } = req.query;

    const cacheKey = `products:${category}:${minPrice}:${maxPrice}:${isAvailable}:${page || 'all'}:${limit || 'all'}:${sortBy}:${order}`;

    const cached = await redisClient.get(cacheKey);
    // if (cached) return res.json(JSON.parse(cached));

     if (cached) {
      return res.json({
      source: 'redis',
      data: JSON.parse(cached)
});
}

    const where = {};
    if (category) where.category = category;
    if (minPrice || maxPrice) where.price = {};
    if (minPrice) where.price[Op.gte] = Number(minPrice);
    if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    if (isAvailable !== undefined) where.isAvailable = isAvailable === 'true';

    const queryOptions = {
      where,
      order: [[sortBy, order]],
    };

    // Apply pagination only if page and limit are provided
    if (page && limit) {
      Object.assign(queryOptions, applyPagination(queryOptions, Number(page), Number(limit)));
    }

    const result = await Product.findAndCountAll(queryOptions);

    // Format response with count and rows
    const response = {
      count: result.count,
      rows: result.rows
    };

    await redisClient.set(cacheKey, JSON.stringify(response), 'EX', 3600);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
