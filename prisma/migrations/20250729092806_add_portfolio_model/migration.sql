/*
  Warnings:

  - You are about to drop the column `name` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `c_name` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "name",
ADD COLUMN     "c_name" TEXT NOT NULL;
