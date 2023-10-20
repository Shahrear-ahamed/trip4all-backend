/*
  Warnings:

  - A unique constraint covering the columns `[service_id]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookings_service_id_key" ON "bookings"("service_id");
