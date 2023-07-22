/*
  Warnings:

  - A unique constraint covering the columns `[tax_id]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User_Organization" ADD COLUMN     "InvoicesIds" TEXT[];

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "facturapi_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "varification_url" TEXT,
    "date" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "folio_number" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_tax_id_key" ON "Customers"("tax_id");

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
