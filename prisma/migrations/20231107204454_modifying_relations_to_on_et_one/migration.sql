/*
  Warnings:

  - A unique constraint covering the columns `[root_location_id]` on the table `Equipments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[current_location_id]` on the table `Equipments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[last_used]` on the table `Equipments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipments_root_location_id_key" ON "Equipments"("root_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipments_current_location_id_key" ON "Equipments"("current_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipments_last_used_key" ON "Equipments"("last_used");
