-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "status" TEXT DEFAULT E'draft',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "publishDate" TIMESTAMP(3),
    "author" UUID,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "released" INTEGER,
    "backgroundColor" TEXT NOT NULL DEFAULT E'',
    "rating" DOUBLE PRECISION,
    "scoresCount" INTEGER,
    "director" TEXT NOT NULL DEFAULT E'',
    "videoLink" TEXT NOT NULL DEFAULT E'',
    "videoPreviewLink" TEXT NOT NULL DEFAULT E'',
    "runTime" INTEGER,
    "genre" UUID,
    "imagePoster" JSONB,
    "imagePreview" JSONB,
    "imageBackground" JSONB,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL DEFAULT E'',
    "rating" INTEGER,
    "date" TIMESTAMP(3),
    "film" UUID,
    "user" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Post_tags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_User_favoriteFilms" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Actor_films" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_User_favoriteActors" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Post_author_idx" ON "Post"("author");

-- CreateIndex
CREATE INDEX "Film_genre_idx" ON "Film"("genre");

-- CreateIndex
CREATE INDEX "Comment_film_idx" ON "Comment"("film");

-- CreateIndex
CREATE INDEX "Comment_user_idx" ON "Comment"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_AB_unique" ON "_Post_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_B_index" ON "_Post_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_User_favoriteFilms_AB_unique" ON "_User_favoriteFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_User_favoriteFilms_B_index" ON "_User_favoriteFilms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Actor_films_AB_unique" ON "_Actor_films"("A", "B");

-- CreateIndex
CREATE INDEX "_Actor_films_B_index" ON "_Actor_films"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_User_favoriteActors_AB_unique" ON "_User_favoriteActors"("A", "B");

-- CreateIndex
CREATE INDEX "_User_favoriteActors_B_index" ON "_User_favoriteActors"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_genre_fkey" FOREIGN KEY ("genre") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_film_fkey" FOREIGN KEY ("film") REFERENCES "Film"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD CONSTRAINT "_Post_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD CONSTRAINT "_Post_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_favoriteFilms" ADD CONSTRAINT "_User_favoriteFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_favoriteFilms" ADD CONSTRAINT "_User_favoriteFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_films" ADD CONSTRAINT "_Actor_films_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Actor_films" ADD CONSTRAINT "_Actor_films_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_favoriteActors" ADD CONSTRAINT "_User_favoriteActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_favoriteActors" ADD CONSTRAINT "_User_favoriteActors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
