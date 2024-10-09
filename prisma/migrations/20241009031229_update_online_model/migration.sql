/*
  Warnings:

  - You are about to drop the `Online` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Online" DROP CONSTRAINT "Online_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Online";
