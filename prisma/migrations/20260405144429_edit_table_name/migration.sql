/*
  Warnings:

  - You are about to drop the `Sentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_sentenceId_fkey";

-- DropTable
DROP TABLE "Sentence";

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "SENTENCE" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SENTENCE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WORD" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WORD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WORD" ADD CONSTRAINT "WORD_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "SENTENCE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
