import express from "express";

import cors from "cors";

import usersRouter from "./routes/users/route";
import locationsRouter from "./routes/locations/route";
import equipmentsRouter from "./routes/equipments/route";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use(usersRouter);
app.use(locationsRouter);
app.use(equipmentsRouter);

app.listen(3001, () => {
  console.log("running on port http://localhost:3001");
});
