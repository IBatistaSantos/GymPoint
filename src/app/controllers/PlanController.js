import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const shecma = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await shecma.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const { title, duration, price } = req.body;
    const plan = await Plan.create({
      title,
      duration,
      price,
      admin_id: req.adminId,
    });
    return res.status(200).json(plan);
  }
}

export default new PlanController();
