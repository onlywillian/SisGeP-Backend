import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";

const prisma = new PrismaClient();

export const get = async (req: Request, res: Response) => {
  const equipments = await prisma.equipments.findMany();

  if (!equipments)
    return res.status(404).send({ Error: "Nenhum equipamento encontrado." });

  return res.status(200).send({ Equipments: equipments });
};

export const getUnique = async (req: Request, res: Response) => {
  const { id }: any = req.params;

  const equipment = await prisma.equipments.findFirst({
    where: {
      id: id,
    },
  });

  if (!equipment)
    return res.status(404).send({ Error: "Nenhum equipamento encontrado." });

  return res.status(200).send({ Equipments: equipment });
};

export const post = async (req: Request, res: Response) => {
  console.log(req.files, req.body);

  // const {id, name, description, photo,root_location_id, current_location_id, qr_code}: any = req.body;

  // const equipment = await prisma.equipments.findFirst({
  //     where: {
  //         id: id
  //     }
  // })

  // if(!equipment) return res.status(500).send({ Error: "Erro ao criar o equipamento."})

  // const newEquipment= await prisma.equipments.create({
  //     data: {
  //         name: name,
  //         description: description,
  //         photo: photo,
  //         root_location_id: root_location_id,
  //         current_location_id: current_location_id,
  //         qr_code: qr_code,
  //     }
  // })
  // if (!newEquipment) return res.status(500).send({ Error: "Erro na criacao do usuario" });

  // return res.status(201).send({ Equipments: newEquipment });
};

export const put = async (req: Request, res: Response) => {
  const {
    id,
    newName,
    newDescription,
    newRootLocationId,
    newPhoto,
    newCurrentLocationId,
    newQr_code,
  } = req.body;

  const equipment = await prisma.equipments.findFirst({
    where: {
      id: id,
    },
  });

  if (!equipment)
    return res.status(500).send({ Error: "O equipamento não existe." });

  const updateEquipment = await prisma.equipments.update({
    where: {
      id: id,
    },
    data: {
      name: newName,
      description: newDescription,
      photo: newPhoto,
      root_location_id: newRootLocationId,
      current_location_id: newCurrentLocationId,
      qr_code: newQr_code,
    },
  });

  if (!updateEquipment)
    return res.status(500).send({ Error: "Algum erro ocorreu" });

  return res.status(200).send({ Equipments: updateEquipment });
};

export const del = async (req: Request, res: Response) => {
  const { id } = req.body;

  const equipment = await prisma.equipments.findFirst({
    where: {
      id: id,
    },
  });

  if (!equipment)
    return res.status(404).send({ Error: "O equipamento não existe." });

  const deletedEquipment = await prisma.equipments.delete({
    where: {
      id: id,
    },
  });
  if (!deletedEquipment)
    return res.status(500).send({ Error: "Algum erro ocorreu" });

  return res.status(200).send({ Equipments: deletedEquipment });
};
