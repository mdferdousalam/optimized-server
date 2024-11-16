/*
  Warnings:

  - You are about to drop the column `amount` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `Donation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iban]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `BIC (SWIFT-Code)` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Beguenstigter/Zahlungspflichtiger` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Betrag` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Buchungstext` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Kontonummer/IBAN` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Valutadatum` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Verwendungszweck` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iban` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "amount",
DROP COLUMN "transactionDate",
ADD COLUMN     "BIC (SWIFT-Code)" TEXT NOT NULL,
ADD COLUMN     "Beguenstigter/Zahlungspflichtiger" TEXT NOT NULL,
ADD COLUMN     "Betrag" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Buchungstext" TEXT NOT NULL,
ADD COLUMN     "Info" TEXT,
ADD COLUMN     "Kontonummer/IBAN" TEXT NOT NULL,
ADD COLUMN     "Valutadatum" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Verwendungszweck" TEXT NOT NULL,
ADD COLUMN     "Waehrung" TEXT NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "iban" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Donor_iban_key" ON "Donor"("iban");
