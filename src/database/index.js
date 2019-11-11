import Sequelize from 'sequelize';

import User from '../app/models/Admin';
import Student from '../app/models/Students';
import Plan from '../app/models/Plan';
import Management from '../app/models/Management';
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Management];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
