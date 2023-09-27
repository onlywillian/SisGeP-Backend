import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";

const prisma = new PrismaClient();

export const get = async (req: Request, res: Response) => {
  const locations = await prisma.locations.findMany();

  if (!locations)
    return res.status(404).send({ Error: "Nenhum local encontrado." });

  return res.status(200).send({ Locations: locations });
};

export const getUnique = async (req: Request, res: Response) => {
  const { id }: any = req.params;

  const location = await prisma.locations.findFirst({
    where: {
      id: id,
    },
  });

  if (!location)
    return res.status(404).send({ Error: "Nenhum local encontrado." });

  return res.status(200).send({ Locations: location });
};

export const post = async (req: Request, res: Response) => {
  try {
    const { name, description, photo } = req.body;

    const location = await prisma.locations.findFirst({
      where: {
        name: name,
      },
    });

    if (location)
      return res.status(500).send({ Error: "Esse local já existe!" });

    QRCode.toDataURL("www.google.com", { scale: 8 }, async (err, url) => {
      if (err) throw err;

      const newLocation = await prisma.locations.create({
        data: {
          name: name,
          description: description,
          photo: photo,
          qr_code: url,
        },
      });

      if (!newLocation)
        return res.status(500).send({ Error: "Erro na criacao do usuario" });

      return res.status(201).send({ Location: url });
    });
  } catch (err) {
    console.log(err);
  }
};

export const put = async (req: Request, res: Response) => {
  const { id, newName, newDescription, newPhoto } = req.body;

  const location = await prisma.locations.findFirst({
    where: {
      id: id,
    },
  });

  if (!location) return res.status(404).send({ Error: "O local não existe." });

  const updateLocation = await prisma.locations.update({
    where: {
      id: id,
    },
    data: {
      name: newName,
      description: newDescription,
      photo: newPhoto,
    },
  });
  if (!updateLocation)
    return res
      .status(500)
      .send({ Error: "Não foi possível atualizar o Local" });

  return res.status(200).send({ Location: updateLocation });
};

export const del = async (req: Request, res: Response) => {
  const { id } = req.body;
  const location = await prisma.locations.findFirst({
    where: {
      id: id,
    },
  });

  if (!location) return res.status(404).send({ Error: "O local não existe." });

  const deletedLocation = await prisma.locations.delete({
    where: {
      id: id,
    },
  });
  if (!deletedLocation)
    return res.status(500).send({ Error: "Não foi possível deletar o local" });

  return res.status(200).send({ Location: deletedLocation });
};
