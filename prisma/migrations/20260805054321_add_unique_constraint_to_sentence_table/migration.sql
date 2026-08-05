/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `SENTENCE` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SENTENCE_content_key" ON "SENTENCE"("content");
