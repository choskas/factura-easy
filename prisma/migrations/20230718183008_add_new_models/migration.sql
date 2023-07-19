/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Organization" ADD COLUMN     "customersId" TEXT[],
ADD COLUMN     "productsIds" TEXT[];

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "facturapi_id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_key" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "facturapi_id" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,
    "tax_system" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
