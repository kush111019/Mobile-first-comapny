module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [...Array(100)].map((_, i) => ({
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 500),
      category: i % 2 === 0 ? 'Electronics' : 'Clothing',
      stock: 20,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('products', products);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
