/*
  Warnings:

  - A unique constraint covering the columns `[facturapi_token]` on the table `User_Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User_Organization" ADD COLUMN     "facturapi_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_Organization_facturapi_token_key" ON "User_Organization"("facturapi_token");
