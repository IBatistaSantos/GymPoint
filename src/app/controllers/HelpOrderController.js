import * as Yup from 'yup';
import Student from '../models/Students';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const helps = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });
    return res.status(200).json(helps);
  }

  async store(req, res) {
    const shecma = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await shecma.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const studentValid = await Student.findByPk(id);
    if (!studentValid) {
      return res.status(400).json({ error: 'Student not found' });
    }
    const help = await HelpOrder.create({
      question: req.body.question,
      student_id: studentValid.id,
    });
    return res.status(200).json(help);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Question not found' });
    }
    await helpOrder.update({
      question: req.body.question,
    });
    return res.status(200).json(helpOrder);
  }
}

export default new HelpOrderController();
