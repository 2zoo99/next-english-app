-- CreateTable
CREATE TABLE "NEWS_ARTICLE" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "press" TEXT,
    "author" TEXT,
    "category" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NEWS_ARTICLE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TED_TALK" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "speaker" TEXT,
    "durationSec" INTEGER,
    "videoUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TED_TALK_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NEWS_ARTICLE_url_key" ON "NEWS_ARTICLE"("url");

-- CreateIndex
CREATE UNIQUE INDEX "TED_TALK_url_key" ON "TED_TALK"("url");
