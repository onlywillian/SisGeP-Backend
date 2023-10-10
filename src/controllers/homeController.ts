import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCounts = async (req: Request, res: Response) => {
  try {
    const equipments = await prisma.equipments.count();
    const locations = await prisma.locations.count();
    const users = await prisma.users.count();
      
    return res.status(200).send({ Equipments: equipments, Locations: locations, Users: users });

  } catch (err) {
    console.log(err)
  }
};
