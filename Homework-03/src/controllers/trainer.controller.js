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

  //3. Create trainer
  static async createTrainer(req, res) {
    try {
      const trainerData = req.body;

      const newTrainer = await TrainerModel.createTrainer(trainerData);

      return res.status(201).json(newTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  //4. Update trainer
  static async updateTrainer(req, res) {
    try {
      const updateData = req.body;
      const trainerId = req.params.id;

      const updatedTrainer = await TrainerModel.updateTrainer(
        trainerId,
        updateData
      );

      return res.json(updatedTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  //5. Delete student
  static async deleteTrainer(req, res) {
    try {
      await TrainerModel.deleteTrainer(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  //6. Delete all trainers
  static async deleteAllTrainers(req, res) {
    try {
      await TrainerModel.deleteAllTrainers();

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
