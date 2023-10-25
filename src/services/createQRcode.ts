import QRCode from "qrcode";

type values =  "equipments"| "locations"|"users"

export default async function createQRcode(ref: number | string, type: values) {
    return await QRCode.toDataURL(`https://sisgep-api.onrender.com/${type}/${ref}`, { scale: 8 })
}