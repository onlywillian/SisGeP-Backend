import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import createQRcode from "../services/createQRcode";
import uploadImage from "../services/uploadImageService";
import updateImage from "../services/updateImageService";
import deleteImage from "../services/deleteImageService";

const prisma = new PrismaClient();
export const get = async (req: Request, res: Response) => {
  try {
    const locations = await prisma.locations.findMany();

    if (!locations)
      return res.status(404).send({ Error: "Nenhum local encontrado." });

    return res.status(200).send({ Locations: locations });
  } catch(err) {
    console.log(err)
  }
};

export const getUnique = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const location = await prisma.locations.findFirst({
      where: {
        id: Number(id),
      },
    });
  
    if (!location)
      return res.status(404).send({ Error: "Nenhum local encontrado." });
  
    return res.status(200).send({ Location: location });

  } catch (err) {
    console.log(err)
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const file = req.file

    if (!file) {
      return res.status(400).json({ Error: 'Nenhum arquivo foi enviado.' });
    }

    const location = await prisma.locations.findFirst({
      where: {
        name: name,
      },
    });

    if (location)
      return res.status(401).send({ Error: "Esse local já existe!" });

    const newLocation = await prisma.locations.create({
      data: { 
        name: name,
        description: description,
        photo: await uploadImage(file.buffer, name),
      },
    });

    if (!newLocation)
      return res.status(500).send({ Error: "Erro na criacao do usuario" });

    const updateLocation = await prisma.locations.update({
      where: {
        id: newLocation.id
      }, 
      data: {
        qr_code: await createQRcode(newLocation.id, "location")
      }
    });

    return res.status(201).send({ Location: updateLocation });
  } catch (err) {
    return res.status(500).send({ Error: err });
  }
};

export const put = async (req: Request, res: Response) => {
  try {
    const { id, oldName, newName, newDescription } = req.body;
    const file = req.file
  
    const location = await prisma.locations.findFirst({
      where: {
        id: Number(id),
      },
    });
  
    if (!location) return res.status(404).send({ Error: "O local não existe." });
  
    if (!file) {
      const updateLocation = await prisma.locations.update({
        where: {
          id: Number(id),
        },
        data: {
          name: newName,
          description: newDescription,
        },
      });
  
      if (!updateLocation)
      return res
        .status(500)
        .send({ Error: "Não foi possível atualizar o Local" });
  
      return res.status(200).send({ Location: updateLocation });
    }
  
    const updateLocation = await prisma.locations.update({
      where: {
        id: Number(id),
      },
      data: {
        name: newName,
        description: newDescription,
        photo: await updateImage(file.buffer, oldName),
      },
    });
  
    if (!updateLocation)
      return res
        .status(500)
        .send({ Error: "Não foi possível atualizar o Local" });
  
    return res.status(200).send({ Location: updateLocation });

  } catch (err) {
    console.log(err)
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const location = await prisma.locations.findFirst({
      where: {
        name: name,
      },
    });
  
    if (!location) return res.status(404).send({ Error: "O local não existe." });
  
    const deletedLocation = await prisma.locations.delete({
      where: {
        name: name,
      },
    });
    
    const deletedImage = deleteImage(name);
  
    if (!deletedLocation)
      return res.status(500).send({ Error: "Não foi possível deletar o local" });
  
    return res.status(200).send({ Location: deletedLocation });

  } catch (err) {
    console.log(err)
  }
};
