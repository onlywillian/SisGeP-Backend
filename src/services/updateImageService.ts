import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import storage from '../database/config'

export default function updateImage(buffer: Buffer, name: string) {
    const storageRef = ref(storage, `images/${name}`);

    return new Promise<string>(async (resolve, reject) => {
        try {    
          const snapshot = await uploadBytes(storageRef, buffer);
    
          const downloadURL = await getDownloadURL(snapshot.ref);
    
          resolve(downloadURL); 
        } catch (error) {
          console.error('Erro ao atualizar a imagem: ', error);
          reject(error);
        }
    })
}