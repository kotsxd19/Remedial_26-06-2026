import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import RegistrerUserRouter from "./src/routers/users.js"
import LoginUserRouter from "./src/routers/loginUser.js"
import LogoutRouter from "./src/routers/logout.js"
import dateRouter from "./src/routers/date.js"


const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())
app.use("/api/RegistrerUser", RegistrerUserRouter)
app.use("/api/LoginUser", LoginUserRouter)
app.use("/api/Logout", LogoutRouter)
app.use("/api/date", dateRouter)

export default app



