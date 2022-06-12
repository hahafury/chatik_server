import express, {Router} from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
const router: Router = express.Router();

authRouter(router);
chatRouter(router);

export default router;