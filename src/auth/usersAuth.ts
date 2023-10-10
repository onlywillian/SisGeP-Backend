import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const authRouter = Router();

// Secret key from .env file
const SECRET_KEY = "OT157895321562OAISUhUNDEhWLLJ";

authRouter.post("/auth/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) return res.status(200).send({ Error: "Nome de usuário não informado" });

  if (!password) return res.status(200).send({ Error: "Senha não informada" });

  const user = await prisma.users.findFirst({
    where: {
      username: username,
      password: password
    },
  });

  if (!user) return res.status(200).send({ Error: "User not found" });

  // Creating jwt token
  const token = jwt.sign(
    {
      name: user?.username,
      password: user?.password,
    },
    SECRET_KEY,
    {
      expiresIn: "1 days",
    }
  );

  return res
    .send({ User: { name: user.username, password: user.password }, token: token })
    .status(200);
});

authRouter.post("/auth/register", async (req: Request, res: Response) => {
  const { username, password, office } = req.body;

  if (!username) return res.status(200).send({ Error: "Nome de usuário não informado" });
  
  if (!password) return res.status(200).send({ Error: "Senha não informada" });

  if (!office) return res.status(200).send({ Error: "Cargo não informada" });

  // Verifing if user exists
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (user) return res.send({ Error: "User alreads exists" }).status(401);

  // Creating a new User
  const newUser = await prisma.users.create({
    data: {
      username: username,
      password: password,
      office: office
    },
  });

  if (!newUser) return res.send({ Error: "Erro ao criar usuário" }).status(500);

  // Creating jwt token
  const token = jwt.sign(     
    {
      id: newUser?.id,
    },
    SECRET_KEY,
    {
      expiresIn: "1 days",
    }
  );

  return res
    .send({
      User: { id: newUser.id, name: newUser.username },
      token: token,
    })
    .status(200);
});

export default authRouter;