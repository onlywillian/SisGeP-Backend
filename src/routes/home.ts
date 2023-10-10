import { Router } from "express";
import { getAllCounts } from "../controllers/homeController";
const homeRouter = Router();

homeRouter.get("/home", getAllCounts)

export default homeRouter;  