/*
  Warnings:

  - You are about to drop the column `order` on the `WORD` table. All the data in the column will be lost.
  - You are about to drop the column `sentenceId` on the `WORD` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word]` on the table `WORD` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WORD" DROP CONSTRAINT "WORD_sentenceId_fkey";

-- AlterTable
ALTER TABLE "WORD" DROP COLUMN "order",
DROP COLUMN "sentenceId",
ADD COLUMN     "meaning" TEXT;

-- CreateTable
CREATE TABLE "SentenceWord" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "SentenceWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WORD_word_key" ON "WORD"("word");

-- AddForeignKey
ALTER TABLE "SentenceWord" ADD CONSTRAINT "SentenceWord_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "SENTENCE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceWord" ADD CONSTRAINT "SentenceWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "WORD"("id") ON DELETE CASCADE ON UPDATE CASCADE;
