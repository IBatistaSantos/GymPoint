import { Sequelize, Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DOUBLE,
        height: Sequelize.DOUBLE,
        canceled_at: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admins' });
  }
}
export default Students;
