import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import Management from '../models/Management';
import Student from '../models/Students';
import Plan from '../models/Plan';

class ManagementController {
  async index(req, res) {
    const managements = await Management.findAll({
      where: {
        admin_id: req.adminId,
        canceled_at: null,
      },
      include: [
        {
          model: Plan,
          as: 'plans',
          attributes: ['title', 'price', 'duration'],
        },
        {
          model: Student,
          as: 'students',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(managements);
  }

  async store(req, res) {
    const shecma = Yup.object().shape({
      start_data: Yup.date().required(),
      plan_id: Yup.number().required(),
      student_id: Yup.number().required(),
    });
    if (!(await shecma.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const PlanIsAdmin = await Plan.findByPk(req.body.plan_id);

    // Validando se o plano foi criado por esse administrador
    if (PlanIsAdmin.admin_id !== req.adminId) {
      return res
        .status(400)
        .json({ error: 'You are not the creator of the plan' });
    }

    const StudentIsAdmin = await Plan.findByPk(req.body.student_id);

    // Validando se o estudante é o administrador
    if (StudentIsAdmin.admin_id !== req.adminId) {
      return res
        .status(400)
        .json({ error: 'You are not the student administrator' });
    }

    // Formatando a data recebida = 2019-11-11
    const start_data = parseISO(req.body.start_data);
    const formatStartData = format(start_data, 'dd/MM/yyyy');

    // Calculando o preço a partir da duração do plano
    const price = PlanIsAdmin.duration * PlanIsAdmin.price;

    // Calculando a data do termino a partir da duração do plano
    const end_data = addMonths(start_data, PlanIsAdmin.duration);

    const formatEndData = format(end_data, 'dd/MM/yyyy');
    console.log(formatEndData);
    console.log(formatStartData);

    const management = await Management.create({
      start_data: formatStartData,
      end_data: formatEndData,
      price,
      admin_id: req.adminId,
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
    });

    return res.json(management);
  }

  async update(req, res) {
    const { id } = req.params;
    const management = await Management.findByPk(id);

    if (management.admin_id !== req.adminId) {
      return res
        .status(401)
        .json({ error: ' You are not the enrollment manager' });
    }
    const { start_data } = await management.update(req.body);

    return res.status(200).json({
      start_data,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const management = await Management.findByPk(id);

    if (management.admin_id !== req.adminId) {
      res.status(401).json({ error: 'You are not the registration manager' });
    }
    await management.update({
      canceled_at: true,
    });
    return res.json({ message: 'Registration Successfully deleted' });
  }
}

export default new ManagementController();
