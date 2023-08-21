/*
  Warnings:

  - You are about to drop the `note_to_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "note_to_tags";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "note_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    CONSTRAINT "note_tags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "movie_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "note_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "movie_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
