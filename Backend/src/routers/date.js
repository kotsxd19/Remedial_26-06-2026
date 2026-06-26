import express from "express";
import dateController from "../Controller/dateController.js"
import userEmployee from "../models/userEmployee.js";
import { validateAuthCookie } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
.route("/")
.get(dateController.getDate)
.post(dateController([UserAdmin]), insertDate)

router
.route("/:id")
.put(dateController.updateDate)
.delete(dateController([UserEmployee]), deleteDate)
.get(dateController.getDateById)


export default router;