import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class AnswerController {
  async store(req, res) {
    const shecma = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await shecma.isValid(req.body))) {
      res.status(400).json({ error: 'ValidationFails' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(id);
    if (!helpOrder) {
      return res.status(400).json({ error: 'Question not found' });
    }
    console.log(answer);

    const answerQuestion = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });
    return res.status(200).json(helpOrder);
  }
}

export default new AnswerController();
