module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'email');
  },
};
