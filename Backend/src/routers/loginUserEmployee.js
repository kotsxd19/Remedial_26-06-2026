import express from "express"
import loginUsersController from "../Controller/LoginUserEmployeeController.js"

const router = express.Router();

router.route("/").post(loginUsersController.login)

export default router

