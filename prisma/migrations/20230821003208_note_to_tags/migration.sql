/*
  Warnings:

  - You are about to drop the column `note_id` on the `movie_tags` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "NoteToTags" (
    "note_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("note_id", "tag_id"),
    CONSTRAINT "NoteToTags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "movie_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NoteToTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "movie_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "movie_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_movie_tags" ("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "movie_tags";
DROP TABLE "movie_tags";
ALTER TABLE "new_movie_tags" RENAME TO "movie_tags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
