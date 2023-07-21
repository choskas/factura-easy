-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_VALIDATION', 'VALIDATED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "User_Organization" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'IN_VALIDATION';
