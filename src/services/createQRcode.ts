import QRCode from "qrcode";

export default async function createQRcode(ref: number | string) {
    return await QRCode.toDataURL(`http://localhost:3001/locations/${ref}`, { scale: 8 })
}