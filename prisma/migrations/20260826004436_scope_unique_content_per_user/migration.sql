/*
  Warnings:

  - A unique constraint covering the columns `[content,userId]` on the table `EXPRESSION` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[content,userId]` on the table `SENTENCE` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EXPRESSION_content_key";

-- DropIndex
DROP INDEX "SENTENCE_content_key";

-- CreateIndex
CREATE UNIQUE INDEX "EXPRESSION_content_userId_key" ON "EXPRESSION"("content", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SENTENCE_content_userId_key" ON "SENTENCE"("content", "userId");
