import { Sequelize, Model } from 'sequelize';

class Management extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.STRING,
        start_data: Sequelize.DATE,
        end_data: Sequelize.DATE,
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
    this.belongsTo(models.Students, {
      foreignKey: 'student_id',
      as: 'students',
    });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plans' });
  }
}

export default Management;
