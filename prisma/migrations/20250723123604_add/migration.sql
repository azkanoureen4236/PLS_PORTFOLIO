-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Admin';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Admin';
