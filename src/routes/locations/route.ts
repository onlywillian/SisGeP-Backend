import { Router } from "express";

import * as locationsController from "../../controllers/locationsController";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const locationsRouter = Router();

locationsRouter.get("/locations", locationsController.get);
locationsRouter.get("/locations/:id", locationsController.getUnique);
locationsRouter.post("/locations/new", upload.single("photo"), locationsController.post);
locationsRouter.put("/locations/update", upload.single("photo"), locationsController.put);
locationsRouter.delete("/locations/delete", locationsController.del);

export default locationsRouter;
