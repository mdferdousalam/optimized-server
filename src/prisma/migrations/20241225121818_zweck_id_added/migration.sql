/*
  Warnings:

  - Made the column `info` on table `Donor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donor" ALTER COLUMN "info" SET NOT NULL;
