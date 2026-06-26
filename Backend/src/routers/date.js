import express from "express";
import dateController from "../Controller/dateController.js"

const router = express.Router();

router
.route("/")
.get(dateController.getDate)
.post(dateController.insertDate)

router
.route("/:id")
.put(dateController.updateDate)
.delete(dateController.deleteDate)
.get(dateController.getDateById)


export default router;