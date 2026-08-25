/*
  Warnings:

  - Added the required column `userId` to the `EXPRESSION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SENTENCE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EXPRESSION" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "SENTENCE" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "SENTENCE" ADD CONSTRAINT "SENTENCE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXPRESSION" ADD CONSTRAINT "EXPRESSION_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
