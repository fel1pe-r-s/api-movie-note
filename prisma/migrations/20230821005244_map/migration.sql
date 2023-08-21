/*
  Warnings:

  - You are about to drop the `NoteToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NoteToTags";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "note_to_tags" (
    "note_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("note_id", "tag_id"),
    CONSTRAINT "note_to_tags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "movie_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "note_to_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "movie_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
