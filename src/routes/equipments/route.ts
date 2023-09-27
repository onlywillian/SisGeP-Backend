import { Router } from "express";

import * as equipmentsController from "../../controllers/equipmentsController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const equipmentsRouter = Router();

equipmentsRouter.get("/equipments", equipmentsController.get);
equipmentsRouter.get("/equipments/:id", equipmentsController.getUnique);
equipmentsRouter.post(
  "/equipments/new",
  upload.any(),
  equipmentsController.post
);
equipmentsRouter.put("/equipments/update", equipmentsController.put);
equipmentsRouter.delete("/equipments/delete", equipmentsController.del);

export default equipmentsRouter;
