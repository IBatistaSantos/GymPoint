import Sequelize from 'sequelize';

import User from '../app/models/Admin';
import Student from '../app/models/Students';
import Plan from '../app/models/Plan';
import Management from '../app/models/Management';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Management, Checkin, HelpOrder];

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
