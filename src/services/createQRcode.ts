import QRCode from "qrcode";

type values =  "equipment" | "location"

export default async function createQRcode(ref: number, type: values) {
    return await QRCode.toDataURL(`${ref}-${type}`, { scale: 8 })
}