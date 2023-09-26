import { Router } from "express";

import * as equipmentsController from "../../controllers/equipmentsController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const equipmentsRouter = Router();

equipmentsRouter.get("/locations", equipmentsController.get);
equipmentsRouter.get("/locations/:id", equipmentsController.getUnique);
equipmentsRouter.post("/locations/new", equipmentsController.post);
equipmentsRouter.put("/locations/update", equipmentsController.put);
equipmentsRouter.delete("/locations/delete", equipmentsController.del);

export default equipmentsRouter;
