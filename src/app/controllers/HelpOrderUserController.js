import HelpOrder from '../models/HelpOrder';
import Student from '../models/Students';

class HelpOrderUserController {
  async index(req, res) {
    const { id } = req.params;
    const studentValid = await Student.findByPk(id);
    if (!studentValid) {
      return res.status(400).json({ error: 'Student not found' });
    }
    const helps = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
    });
    return res.status(200).json(helps);
  }
}

export default new HelpOrderUserController();
