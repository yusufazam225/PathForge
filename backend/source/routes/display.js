import express from "express";
import User from "./../models/points.model.js";

const router = express.Router();
router.get("/display", async (req, res) => {
  try {
    const drawings = await User.find();
    res.send(drawings);
  } catch (error) {
    console.log(`error in display:${error}`);
  }
});
export default router;
