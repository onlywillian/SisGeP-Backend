import { Router } from "express";

import * as usersController from "../../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/users", usersController.get);
usersRouter.get("/users/:id", usersController.getUniqueUser);
usersRouter.post("/users/new", usersController.post);
usersRouter.put("/users/update", usersController.put);
usersRouter.delete("/users/delete", usersController.deleteUser);

export default usersRouter;
