/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "User_Organization" (
    "id" TEXT NOT NULL,
    "facturapi_id" TEXT,
    "api_token" TEXT,
    "name" TEXT,
    "maternal_name" TEXT,
    "last_name" TEXT,
    "rfc" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN,
    "phone" TEXT,
    "entreprise_name" TEXT,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "addressId" TEXT,

    CONSTRAINT "User_Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "exterior" TEXT NOT NULL,
    "interior" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Organization_facturapi_id_key" ON "User_Organization"("facturapi_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Organization_api_token_key" ON "User_Organization"("api_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_Organization_email_key" ON "User_Organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Organization_phone_key" ON "User_Organization"("phone");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
