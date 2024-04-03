import { DataService } from "../services/data.service.js";
import { createPath } from "../../utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";

const TRAINERS_PATH = createPath(["data", "trainers.json"]);

class Trainer {
  id = uuid();

  constructor(
    firstName,
    lastName,
    email,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished
  ) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.isCurrentlyTeaching = isCurrentlyTeaching;
    this.timeEmployed = timeEmployed;
    this.coursesFinished = coursesFinished;
  }
}

const trainerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  isCurrentlyTeaching: Joi.boolean().required(),
  timeEmployed: Joi.string().min(2).required(),
  coursesFinished: Joi.number().integer().min(0).required(),
});

export class TrainerModel {
  //Save trainers
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(TRAINERS_PATH, trainers);
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

  //3. Create trainer
  static async createTrainer(trainerData) {
    const trainers = await this.getAllTrainers();

    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const validation = trainerSchema.validate(trainerData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const {
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished,
    } = trainerData;

    const newTrainer = new Trainer(
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished
    );

    const updatedTrainers = [...trainers, newTrainer];

    await this.saveTrainers(updatedTrainers);

    return newTrainer;
  }

  //4. Update trainer info
  static async updateTrainer(trainerId, updateData) {
    if (updateData.id) throw new Error("Can't update trainer! Invalid request");

    const trainers = await this.getAllTrainers();

    const trainerExists = trainers.some((trainer) => trainer.id === trainerId);

    if (!trainerExists)
      throw new Error("Can't update trainer! Trainer not found!");

    let updatedTrainer = null;

    const updatedTrainers = trainers.map((trainer) => {
      if (trainer.id === trainerId) {
        updatedTrainer = { ...trainer, ...updateData };

        return updatedTrainer;
      } else {
        return trainer;
      }
    });

    await this.saveTrainers(updatedTrainers);

    return updatedTrainer;
  }

  //5 Delete trainer
  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (trainers.length === updatedTrainers.length)
      throw new Error("Can't delete trainer! Trainer not found!");

    await this.saveTrainers(updatedTrainers);
  }

  //6 Delete all trainers
  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }
}
