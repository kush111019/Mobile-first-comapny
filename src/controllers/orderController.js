const { Order, OrderItem, Cart, Product } = require('../models');
const { sequelize } = require('../models');

exports.placeOrder = async (req, res, next) => {
  const userId = req.user.id;

  const cartItems = await Cart.findAll({ where: { userId } });
  if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

  const t = await sequelize.transaction();
  try {
    const order = await Order.create({ userId, status: 'Pending' }, { transaction: t });

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }
      product.stock -= item.quantity;
      await product.save({ transaction: t });

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      }, { transaction: t });
    }

    await Cart.destroy({ where: { userId }, transaction: t });
    await t.commit();

    res.status(201).json({ message: 'Order placed', orderId: order.id });
  } catch (err) {
    await t.rollback();
    console.log(err)
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items' // must match the alias in the association
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
