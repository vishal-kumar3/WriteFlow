/*
  Warnings:

  - The primary key for the `View` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `View` table. All the data in the column will be lost.
  - Made the column `userId` on table `View` required. This step will fail if there are existing NULL values in that column.
  - Made the column `blogId` on table `View` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "View" DROP CONSTRAINT "View_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "blogId" SET NOT NULL,
ADD CONSTRAINT "View_pkey" PRIMARY KEY ("userId", "blogId");
