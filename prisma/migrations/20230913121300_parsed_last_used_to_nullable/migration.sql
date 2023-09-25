-- DropForeignKey
ALTER TABLE "Equipments" DROP CONSTRAINT "Equipments_last_used_fkey";

-- AlterTable
ALTER TABLE "Equipments" ALTER COLUMN "last_used" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "Equipments_last_used_fkey" FOREIGN KEY ("last_used") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
