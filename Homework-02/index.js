import express from "express";

import {
  deleteAllTrainers,
  deleteTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  createTrainer
} from "./src/tasks.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

//1. Get all trainers
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();

    return res.json(trainers);
  } catch (error) {
    //.status sets the status code of the response
    return res.status(500).json({ msg: error.message });
  }
});

//2. Get trainer by id
app.get("/trainers/:id", async (req, res) => {
  try {
    //req.params contains all dynamic path parameters
    const trainerId = req.params.id;

    const foundTrainer = await getTrainerById(trainerId);

    return res.json(foundTrainer);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

//3. Update trainer info
app.patch("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const updateData = req.body;

    if (updateData.id) throw new Error("Invalid Data");

    await updateTrainer(trainerId, updateData);

    return res.sendStatus(204);
  } catch (error) {
    //400 is bad request
    return res.status(400).json({ msg: error.message });
  }
});

//4. Add trainer
app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished } = req.body;

    if (!firstName || !lastName || !email || !isCurrentlyTeaching || !timeEmployed || !coursesFinished) throw new Error("Invalid Data");

    const newTrainer = await createTrainer(firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished);

    //201 is status that means something new was created in the backend
    return res.status(201).json(newTrainer);
  } catch (error) {
    console.log(error);
    //400 is bad request
    return res.status(400).json({ msg: error.message });
  }
});

//6. Delete all trainers
app.delete("/trainers/all", async (req, res) => {
  try {
    await deleteAllTrainers();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//5. Delete trainer
app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up at port ${PORT}`);
});