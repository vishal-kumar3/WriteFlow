/*
  Warnings:

  - A unique constraint covering the columns `[userId,blogId]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "View_userId_blogId_key" ON "View"("userId", "blogId");
