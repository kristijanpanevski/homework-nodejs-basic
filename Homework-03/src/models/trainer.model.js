import { DataService } from "../services/data.service.js";
import { createPath } from "../../utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";

const TRAINERS_PATH = createPath(["data", "trainers.json"]);

class Trainer {
  id = uuid();

  constructor(firstName, lastName, email, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }
}

const trainerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(13).max(77).required(),
  email: Joi.string().email().required(),
});

export class TrainerModel {
  //Save trainers
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(TRAINERS_PATH, students);
  }

  //1. Get all trainers
  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(TRAINERS_PATH);

    return trainers;
  }
  //2. Get trainer by id
  static async getTrainerById(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not found");

    return foundTrainer;
  }
}
//   //3. Create student
//   static async createStudent(studentData) {
//     const students = await this.getAllStudents();

//     const emailExists = students.some(
//       (student) => student.email === studentData.email
//     );

//     if (emailExists) throw new Error("Email already exists!");

//     const validation = studentSchema.validate(studentData);

//     if (validation?.error) throw new Error(validation.error.details[0].message);

//     const { firstName, lastName, age, email } = studentData;

//     const newStudent = new Student(firstName, lastName, email, age);

//     const updatedStudents = [...students, newStudent];

//     await this.saveStudents(updatedStudents);

//     return newStudent;
//   }

//   //4. Update student
//   static async updateStudent(studentId, updateData) {
//     if (updateData.id) throw new Error("Can't update student! Invalid request");

//     const students = await this.getAllStudents();

//     const studentExists = students.some((student) => student.id === studentId);

//     if (!studentExists)
//       throw new Error("Can't update student! Student not found!");

//     let updatedStudent = null;

//     const updatedStudents = students.map((student) => {
//       if (student.id === studentId) {
//         updatedStudent = { ...student, ...updateData };

//         return updatedStudent;
//       } else {
//         return student;
//       }
//     });

//     await this.saveStudents(updatedStudents);

//     return updatedStudent;
//   }

//   //5 Delete student
//   static async deleteStudent(studentId) {
//     const students = await this.getAllStudents();

//     const updatedStudents = students.filter(
//       (student) => student.id !== studentId
//     );

//     if (students.length === updatedStudents.length)
//       throw new Error("Can't delete student! Student not found!");

//     await this.saveStudents(updatedStudents);
//   }
//   //6 Delete all students
//   static async deleteAllStudents() {
//     await this.saveStudents([]);
//   }
// }
