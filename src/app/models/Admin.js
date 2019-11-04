import { Sequelize, Model } from 'sequelize';
import brcypt from 'bcrypt';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async admin => {
      if (admin.password) {
        admin.password_hash = await brcypt.hash(admin.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return brcypt.compare(password, this.password_hash);
  }
}
export default Admin;
