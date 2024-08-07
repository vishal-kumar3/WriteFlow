/*
  Warnings:

  - A unique constraint covering the columns `[userId,blogId,commentId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_blogId_key";

-- DropIndex
DROP INDEX "Like_commentId_key";

-- DropIndex
DROP INDEX "Like_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_blogId_commentId_key" ON "Like"("userId", "blogId", "commentId");
