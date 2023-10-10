/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Equipments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipments_name_key" ON "Equipments"("name");
