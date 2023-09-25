import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const usersRouter = Router();
const prisma = new PrismaClient();

usersRouter.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.users.findMany();

    if (!users) return res.status(500).send({ Error: "Nenhum usuario encontrado" });

    return res.status(200).send({ Users: users });
});

usersRouter.get('/users/:id', async (req: Request, res: Response) => {
    const { id }: any = req.params;

    const user = await prisma.users.findFirst({
        where: {
            id: Number(id)
        }
    })

    if (!user) return res.status(500).send({ Error: "Nenhum usuario encontrado" });

    return res.status(200).send({ Users: user });
})

usersRouter.post("/users/new", async (req: Request, res: Response) => {
    const { username, password, office } = req.body;

    if (!username) return res.status(401).send({ Error: "Sem username no corpo da requisição" })

    const user = await prisma.users.findFirst({
        where: {
            username: username
        }
    });

    if (user) return res.status(401).send({ Error: "Usuario ja existe" });

    const newUser = await prisma.users.create({
        data: {
            username: username,
            password: password,
            office: office
        }
    });
    
    if (!newUser) return res.status(500).send({ Error: "Erro na criacao do usuario" });
    
    return res.status(201).send({ User: newUser });
})

usersRouter.put("/users/update", async (req: Request, res: Response) => {
    const { id, newUsername, newPassword, newOffice } = req.body;

    const user = await prisma.users.findFirst({
        where: {
            id: Number(id)
        }
    });

    if (!user) return res.status(401).send({ Error: "Usuario nao existe" });

    const updateduser = await prisma.users.update({
        where: {
            id: Number(id)
        },
        data: {
            username: newUsername,
            password: newPassword,
            office: newOffice
        }
    });

    if (!updateduser) return res.status(500).send({ Error: "Algum erro ocorreu" });

    return res.status(200).send({ User: updateduser });
})

usersRouter.delete("/users/delete", async (req: Request, res: Response) => {
    const { id } = req.body;

    const user = await prisma.users.findFirst({
        where: {
            id: id
        }
    });

    if (!user) return res.status(401).send({ Error: "Usuario nao existe" });

    const deletedUser = await prisma.users.delete({
        where: {
            id: id
        }
    });

    if (!deletedUser) return res.status(500).send({ Error: "Algum erro ocorreu" });

    return res.status(200).send({ User: deletedUser });
})

export default usersRouter;