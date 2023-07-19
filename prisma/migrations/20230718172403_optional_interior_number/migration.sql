-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "interior" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User_Organization" ALTER COLUMN "emailVerified" SET DEFAULT false;
