import { Router } from "express";
import { TrainerController } from "../controllers/trainer.controller.js";

export const trainerRouter = Router();

trainerRouter.get("/", TrainerController.getAllTrainers);
trainerRouter.get("/:id", TrainerController.getTrainerById);
// trainerRouter.post("/", TrainerController.createTrainer);
// trainerRouter.put("/:id", TrainerController.updateTrainer);
// trainerRouter.delete("/:id", TrainerController.deleteTrainer);
// trainerRouter.delete("/", TrainerController.deleteAllTrainers);
