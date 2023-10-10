import { ref, deleteObject } from 'firebase/storage'
import storage from '../database/config'

export default function deleteImage(name: string) {
    const storageRef = ref(storage, `images/${name}`);

    return new Promise<string>(async (resolve, reject) => {
        try {    
          await deleteObject(storageRef)
    
          resolve("Objeto deletado com sucesso"); 
        } catch (error) {
          console.error('Erro ao atualizar a imagem: ', error);
          reject(error);
        }
    })
}