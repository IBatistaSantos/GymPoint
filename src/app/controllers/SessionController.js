import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const shema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await shema.isValid(req.body))) {
      res.status(400).json({ error: 'Valitation fails' });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Admin not found ' });
    }

    if (!(await admin.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = admin;
    return res.json({
      admin: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
