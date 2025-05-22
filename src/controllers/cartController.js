const { Cart, Product } = require('../models');
const redis = require('../config/redis');

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cacheKey = `cart:${userId}`;

    // Check Redis cache first
    const cachedCart = await redis.get(cacheKey);
    if (cachedCart) {
      return res.json({
      source: 'redis',
      data: JSON.parse(cachedCart)
});
}
    // If not cached, get from
    const cartItems = await Cart.findAll({ where: { userId } });

    // Cache cart in Redis for 30 minutes
    await redis.set(cacheKey, JSON.stringify(cartItems), 'EX', 1800);

    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Add or update cart item in DB
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    // Update Redis cache for the cart
    const cartItems = await Cart.findAll({ where: { userId } });
    await redis.set(`cart:${userId}`, JSON.stringify(cartItems), 'EX', 1800);

    res.json({ message: 'Cart updated', cartItem });
  } catch (err) {
    console.log(err);
    next(err);
  }
};