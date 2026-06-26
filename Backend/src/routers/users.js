import express from "express";

import registrerUserController from "../Controller/registerUsersController.js";

const router = express.Router();

router.route("/")
.post (registrerUserController.registrer)

router.route("/verifyCodeEmail")
.post(registrerUserController.verifyCode)

export default router;


