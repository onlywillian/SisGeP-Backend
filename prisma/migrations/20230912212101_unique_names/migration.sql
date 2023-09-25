/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Equipments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipments_name_key" ON "Equipments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_key" ON "Locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
