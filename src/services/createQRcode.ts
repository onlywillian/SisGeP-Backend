import QRCode from "qrcode";

type values =  "equipments"| "locations"|"users"

export default async function createQRcode(ref: number, type: values) {
    return await QRCode.toDataURL(`${ref}`, { scale: 8 })
}