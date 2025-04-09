/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_email_key" ON "Purchase"("email");
