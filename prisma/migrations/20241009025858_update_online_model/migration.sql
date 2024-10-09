-- CreateTable
CREATE TABLE "Online" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Online_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Online_userId_idx" ON "Online"("userId");

-- AddForeignKey
ALTER TABLE "Online" ADD CONSTRAINT "Online_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
