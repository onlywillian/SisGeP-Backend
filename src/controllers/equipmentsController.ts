import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import createQRcode from "../services/createQRcode";
import uploadImage from "../services/uploadImageService";
import updateImage from "../services/updateImageService";
import deleteImage from "../services/deleteImageService";

const prisma = new PrismaClient();

export const get = async (req: Request, res: Response) => {
  try {
    const equipments = await prisma.equipments.findMany({
      include: {
        Locations: {
          select: {
            name: true
          }
        },
        Current: {
          select: {
            name: true
          }
        },
        Last_Used: {
          select: {
            username: true
          }
        }
      }
    });
  
    if (!equipments)
      return res.status(404).send({ Error: "Nenhum equipamento encontrado." });
  
    return res.status(200).send({ Equipments: equipments });
  } catch (err) {
    console.log(err)
  }
};

export const getUnique = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
  
    const equipment = await prisma.equipments.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        Locations: {
          select: {
            name: true
          }
        },
        Current: {
          select: {
            name: true
          }
        },
        Last_Used: {
          select: {
            username: true
          }
        }
      }
    });
  
    if (!equipment)
      return res.status(404).send({ Error: "Nenhum equipamento encontrado." });
  
    return res.status(200).send({ Equipment: equipment });
    
  } catch (err) {
    console.log(err)
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      initialLocation,
      actualLocation,
      lastUsed,
    }: any = req.body;
  
    const file = req.file;
  
    if (!file) return res.status(401).send({ Error: "Nenhuma imagem enviada" });
  
    const equipment = await prisma.equipments.findFirst({
      where: {
        name: name,
      },
    });
  
    if (equipment)
      return res.status(400).send({ Error: "O equipamento ja existe." });
  
    const newEquipment = await prisma.equipments.create({
      data: {
        name: name,
        description: description,
        photo: await uploadImage(file.buffer, name),
        root_location_id: Number(initialLocation),  
        current_location_id: Number(actualLocation),
        last_used: Number(lastUsed),
      },
    });

    if (!newEquipment)
      return res.status(400).send({ Error: "Erro na criacao do usuario" });

    const equipmentUpdate = await prisma.equipments.update({
      where: {
        id: newEquipment.id
      }, 
      data: {
        qr_code: await createQRcode(newEquipment.id, "equipment")
      }
    });

    if (!equipmentUpdate)
      return res.status(400).send({ Error: "Erro na atualizacao do QRcode" });
  
    return res.status(201).send({ Equipments: newEquipment });
  } catch (err) {
    console.log(err)
  }
};        

export const put = async (req: Request, res: Response) => {
  try {
    const {
      id,
      newName,
      newDescription,
      newRootLocationId,
      newCurrentLocationId,
      newLastUser
    } = req.body; 
  
    const file = req.file;
  
    const equipment = await prisma.equipments.findFirst({
      where: {
        id: Number(id),
      },
    });
  
    if (!equipment)
      return res.status(500).send({ Error: "O equipamento não existe." });

    if (!file) {
      const updateEquipment = await prisma.equipments.update({
        where: {
          id: Number(id)
        },
        data: {
          name: newName,
          description: newDescription,
          Locations: {
            connect: {
              id: Number(newRootLocationId)
            }
          },
          Current: {
            connect: {
              id: Number(newCurrentLocationId),
            }
          },
          Last_Used: {
            connect: {
              id: Number(newLastUser)
            }
          }
        },
      });

      if (!updateEquipment)
      return res.status(500).send({ Error: "Algum erro ocorreu" });
  
      return res.status(200).send({ Equipments: updateEquipment });
    } 
  
    const updateEquipment = await prisma.equipments.update({
      where: {
        id: Number(id)
      },
      data: {
        name: newName,
        description: newDescription,
        photo: await updateImage(file.buffer, id),
        Locations: {
          connect: {
            id: Number(newRootLocationId)
          }
        },
        Current: {
          connect: {
            id: Number(newCurrentLocationId),
          }
        },
        Last_Used: {
          connect: {
            id: Number(newLastUser)
          }
        }
      },
    });
  
    if (!updateEquipment)
      return res.status(500).send({ Error: "Algum erro ocorreu" });
  
    return res.status(200).send({ Equipments: updateEquipment });
  } catch (err) {
    console.log(err)
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const {
      equipmentId,
      locationId,
    } = req.body; 
  
    const updateEquipment = await prisma.equipments.update({
      where: {
        id: Number(equipmentId)
      },
      data: {
        Current: {
          connect: {
            id: Number(locationId)
          }
        }
      },
    });

    if (!updateEquipment)
      return res.status(500).send({ Error: "Algum erro ocorreu" });
  
    return res.status(200).send({ Equipments: updateEquipment });
  } catch (err) {
    console.log(err)
  }
};

export const del = async (req: Request, res: Response) => {
  try {
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
    
  } catch (err) {
    console.log(err)
  }
};
