import { Router } from "express";

import * as locationsController from "../../controllers/locationsController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const locationsRouter = Router();

locationsRouter.get("/locations", locationsController.get);
locationsRouter.get("/locations/:id", locationsController.getUnique);
locationsRouter.post("/locations/new", upload.any(), locationsController.post);
locationsRouter.put("/locations/update", locationsController.put);
locationsRouter.delete("/locations/delete", locationsController.del);

export default locationsRouter;
