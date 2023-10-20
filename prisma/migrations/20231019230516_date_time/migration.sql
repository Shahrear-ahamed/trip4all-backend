/*
  Warnings:

  - Changed the type of `available_date` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "available_date",
ADD COLUMN     "available_date" TIMESTAMP(3) NOT NULL;
