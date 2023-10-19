/*
  Warnings:

  - You are about to drop the `cart_itmes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cart_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_itmes" DROP CONSTRAINT "cart_itmes_cartId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "cart_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "cart_itmes";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
