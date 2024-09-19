-- CreateIndex
CREATE INDEX "About_id_userId_idx" ON "About"("id", "userId");

-- CreateIndex
CREATE INDEX "Blog_slug_id_title_description_idx" ON "Blog"("slug", "id", "title", "description");

-- CreateIndex
CREATE INDEX "Comment_userId_blogId_idx" ON "Comment"("userId", "blogId");

-- CreateIndex
CREATE INDEX "Tag_tag_id_idx" ON "Tag"("tag", "id");

-- CreateIndex
CREATE INDEX "User_username_email_id_idx" ON "User"("username", "email", "id");

-- CreateIndex
CREATE INDEX "View_userId_blogId_idx" ON "View"("userId", "blogId");
