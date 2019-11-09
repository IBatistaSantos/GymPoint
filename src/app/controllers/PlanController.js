import * as Yup from 'yup';
import Plan from '../models/Plan';
import Admin from '../models/Admin';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      where: {
        admin_id: req.adminId,
        canceled_at: null,
      },
      attributes: ['id', 'title', 'duration', 'price'],
      include: [
        {
          model: Admin,
          as: 'admins',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.status(200).json(plans);
  }

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
    return res.status(200).json({ title, duration, price });
  }

  async update(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (plan.admin_id !== req.adminId) {
      return res
        .status(401)
        .json({ error: 'You are not the creator of the plan' });
    }
    const { title, price, duration } = await plan.update(req.body);
    return res.status(200).json({
      title,
      price,
      duration,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (plan.admin_id !== req.adminId) {
      res.status(401).json({ error: 'You are not the creator of the plan' });
    }
    await plan.update({
      canceled_at: true,
    });
    return res.json({ message: 'Plan Successfully deleted' });
  }
}

export default new PlanController();
