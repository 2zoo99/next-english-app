/*
  Warnings:

  - A unique constraint covering the columns `[supabaseId]` on the table `USER` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "USER_supabaseId_key" ON "USER"("supabaseId");
