import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from 'multer'
import QRcode from "qrcode"
import fs from "fs";
import path from "path";

const upload = multer({ dest: "/uploads" })

const locationsRouter = Router();
const prisma = new PrismaClient();

locationsRouter.get('/locations', async (req: Request, res: Response)=>{
    const locations = await prisma.locations.findMany();

    if(!locations) return res.status(404).send({ Error: "Nenhum local encontrado."});

    return res.status(200).send({Locations: locations});
});  

locationsRouter.get('/locations/:id',(req: Request, res: Response)=>{
    const {id}: any =  req.params;

    const location = prisma.locations.findFirst({
        where:{
            id:id 
        }
    });

    if(!location) return res.status(404).send({ Error: "Nenhum local encontrado."});

    return res.status(200).send({Locations: location});
}); 

locationsRouter.post('/locations/new', upload.single("photo"), async (req: Request, res: Response)=>{
    console.log(req.file, req.body)

    const dataToEncode = 'https://www.google.com';
    const nomeDoArquivo = 'qrcode.png';
    const diretorioDeDestino = './'; // Substitua pelo caminho real do diretório

    const caminhoCompleto = path.join(diretorioDeDestino, nomeDoArquivo);

    async function generateQRCode(data: any, filePath: any) {
    try {
        const qrCode = await QRcode.toFile(diretorioDeDestino, nomeDoArquivo);

        

        console.log('QR code gerado com sucesso e salvo como:', filePath);
    } catch (error) {
        console.error('Erro ao gerar o QR code:', error);
    }
    }

generateQRCode(dataToEncode, caminhoCompleto);

    // const { name, description, photo } = req.body;

    // const location = await prisma.locations.findFirst({
    //     where: {
    //         name:name
    //     }
    // });

    // if(!location) return res.status(500).send({ Error: "Erro na criação do local."})
    
    // const newLocation = await prisma.locations.create({
    //     data: {
    //         name: name,
    //         description: description,
    //         photo: photo,
    //     }
    // })

    // if (!newLocation) return res.status(500).send({ Error: "Erro na criacao do usuario" });
    
    // return res.status(201).send({ Location: newLocation });
});

locationsRouter.put('/locations/update', async (req: Request, res: Response)=>{
    const {id, newName, newDescription, newPhoto, newQr_code} = req.body;
    
    const location = await prisma.locations.findFirst({
        where: {
            id:id
        }
    })

    if(!location) return res.status(404).send({ Error: "O local não existe."})

    const updateLocation = await prisma.locations.update({
        where: {
            id: id
        },
        data: {
            name: newName,
            description: newDescription,
            photo: newPhoto,
            qr_code: newQr_code
        }
    });
    if (!updateLocation) return res.status(500).send({ Error: "Não foi possível atualizar o Local" });

    return res.status(200).send({ Location: updateLocation });
});

locationsRouter.delete('/locations/delete',async (req: Request, res: Response)=>{
    const {id} = req.body;
    const location = await prisma.locations.findFirst({
        where: {
            id:id
        }
    })

    if(!location) return res.status(404).send({ Error: "O local não existe."})

    const deletedLocation = await prisma.locations.delete({
        where: {
            id: id
        }
    });
    if (!deletedLocation) return res.status(500).send({ Error: "Não foi possível deletar o local" });

    return res.status(200).send({ Location: deletedLocation });
}); 

export default locationsRouter;