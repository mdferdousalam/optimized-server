/*
  Warnings:

  - You are about to drop the column `Info` on the `Donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "Info",
ADD COLUMN     "Zweck ID" TEXT;
