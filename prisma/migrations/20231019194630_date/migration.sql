/*
  Warnings:

  - You are about to drop the column `availableDate` on the `services` table. All the data in the column will be lost.
  - Added the required column `available_date` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "availableDate",
ADD COLUMN     "available_date" TEXT NOT NULL;
