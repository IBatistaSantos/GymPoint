import * as Yup from 'yup';
import Student from '../models/Students';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      where: {
        admin_id: req.adminId,
        canceled_at: null,
      },
    });
    return res.status(200).json(students);
  }

  async store(req, res) {
    const shema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await shema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists ' });
    }
    const { name, email, age, height, weight } = req.body;
    const student = await Student.create({
      name,
      email,
      age,
      height,
      weight,
      admin_id: req.adminId,
    });

    return res.json(student);
  }

  async update(req, res) {
    const shema = Yup.object().shape({
      name: Yup.string(),
      age: Yup.number(),
      email: Yup.string().email(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await shema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (student.admin_id !== req.adminId) {
      res.status(401).json({ error: 'You are not the student administrator' });
    }

    const { email } = req.body;

    if (email !== student.email) {
      const userExists = await Student.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Student already exists ' });
      }
    }
    const { age, height, weight, name } = await student.update(req.body);

    return res.json({
      id,
      age,
      email,
      height,
      weight,
      name,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (student.admin_id !== req.adminId) {
      res.status(401).json({ error: 'You are not the student administrator' });
    }
    await student.update({
      canceled_at: true,
    });
    return res.json({ message: 'Student Successfully deleted' });
  }
}

export default new StudentController();
