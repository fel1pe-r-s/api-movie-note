-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "note_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "movie_tags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "movie_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "movie_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_movie_tags" ("id", "name", "note_id", "user_id") SELECT "id", "name", "note_id", "user_id" FROM "movie_tags";
DROP TABLE "movie_tags";
ALTER TABLE "new_movie_tags" RENAME TO "movie_tags";
CREATE TABLE "new_movie_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "movie_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_movie_notes" ("created_at", "description", "id", "rating", "title", "updated_at", "user_id") SELECT "created_at", "description", "id", "rating", "title", "updated_at", "user_id" FROM "movie_notes";
DROP TABLE "movie_notes";
ALTER TABLE "new_movie_notes" RENAME TO "movie_notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
