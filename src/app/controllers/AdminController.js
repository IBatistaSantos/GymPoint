import * as Yup from 'yup';
import Admin from '../models/Admin';

class AdminController {
  async store(req, res) {
    const shema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .min(4)
        .required(),
    });

    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const adminExists = await Admin.findOne({
      where: { email: req.body.email },
    });

    if (adminExists) {
      return res.status(400).json({ error: 'User already exists ' });
    }

    const { id, name, email, password_hash } = await Admin.create(req.body);
    return res.status(200).json({
      id,
      name,
      email,
      password_hash,
    });
  }
}

export default new AdminController();
