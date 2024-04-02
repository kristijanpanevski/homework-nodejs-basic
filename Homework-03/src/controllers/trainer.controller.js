import { TrainerModel } from "../models/trainer.model.js";

export class TrainerController {
  //1. Get all students
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerModel.getAllTrainers();

      return res.json(trainers);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  //2. Get trainer by id
  static async getTrainerById(req, res) {
    try {
      const { id: trainerId } = req.params;
      const foundTrainer = await TrainerModel.getTrainerById(trainerId); // Correct reference to TrainerModel
      return res.json(foundTrainer);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
}
//   //3. Create student
//   static async createStudent(req, res) {
//     try {
//       const studentData = req.body;

//       const newStudent = await StudentModel.createStudent(studentData);

//       return res.status(201).json(newStudent);
//     } catch (error) {
//       return res.status(400).json({ msg: error.message });
//     }
//   }

//   //4. Update student
//   static async updateStudent(req, res) {
//     try {
//       const updateData = req.body;
//       const studentId = req.params.id;

//       const updatedStudent = await StudentModel.updateStudent(
//         studentId,
//         updateData
//       );

//       return res.json(updatedStudent);
//     } catch (error) {
//       return res.status(400).json({ msg: error.message });
//     }
//   }
//   //5. Delete student
//   static async deleteStudent(req, res) {
//     try {
//       await StudentModel.deleteStudent(req.params.id);

//       return res.sendStatus(204);
//     } catch (error) {
//       return res.status(404).json({ msg: error.message });
//     }
//   }

//   //6. Delete all students
//   static async deleteAllStudents(req, res) {
//     try {
//       await StudentModel.deleteAllStudents();

//       return res.sendStatus(204);
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   }
// }
