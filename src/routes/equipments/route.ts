import { Router } from "express";

import * as equipmentsController from "../../controllers/equipmentsController";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const equipmentsRouter = Router();

equipmentsRouter.get("/equipments", equipmentsController.get);
equipmentsRouter.get("/equipments/:id", equipmentsController.getUnique);
equipmentsRouter.post(
  "/equipments/new",
  upload.single("photo"),
  equipmentsController.post
);
equipmentsRouter.put("/equipments/update", upload.single("photo"), equipmentsController.put);
equipmentsRouter.delete("/equipments/delete", equipmentsController.del);

export default equipmentsRouter;  
