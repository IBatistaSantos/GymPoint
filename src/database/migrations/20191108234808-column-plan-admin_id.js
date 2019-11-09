module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'admin_id', {
      type: Sequelize.INTEGER,
      references: { model: 'admins', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'admin_id');
  },
};
