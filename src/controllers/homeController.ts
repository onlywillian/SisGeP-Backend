import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCounts = async (req: Request, res: Response) => {
  try {
    
    const locations = await prisma.locations.findMany({
      include: {
        current_location: true
      }
    });
    
      
    return res.status(200).send({Locations: locations});

  } catch (err) {
    console.log(err)
  }
};
