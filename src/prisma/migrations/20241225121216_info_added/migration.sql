/*
  Warnings:

  - A unique constraint covering the columns `[info]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `info` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN "info" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Donor_info_key" ON "Donor"("info");
