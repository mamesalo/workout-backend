import express from "express";
import { Activitie } from "../models/activitieModel.js";
import { verifyToken } from "../authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    if (!req.body.title || !req.body.load || !req.body.reps) {
      return res.status(400).send({
        message: "Please fill in all the fields",
      });
    }

    const newActivitie = {
      title: req.body.title,
      load: req.body.load,
      reps: req.body.reps,
      userId: req.user.userId,
    };

    const activitie = await Activitie.create(newActivitie);
    return res.status(201).send(activitie);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const activities = await Activitie.find({ userId: req.user.userId });
    return res.status(200).json({
      data: activities,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Activity id:", id);
    if (!id) {
      return res.status(400).json({ message: "ID parameter is missing" });
    }

    const activitie = await Activitie.findById(id);
    if (!activitie) {
      return res.status(400).json({
        message: "Activitie not found",
      });
    }

    await Activitie.findByIdAndDelete(id);
    return res.status(200).send({
      message: "Activitie deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
