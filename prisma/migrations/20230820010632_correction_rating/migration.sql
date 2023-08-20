/*
  Warnings:

  - You are about to alter the column `rating` on the `movie_notes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "movie_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movie_notes" ("created_at", "description", "id", "rating", "title", "updated_at", "user_id") SELECT "created_at", "description", "id", "rating", "title", "updated_at", "user_id" FROM "movie_notes";
DROP TABLE "movie_notes";
ALTER TABLE "new_movie_notes" RENAME TO "movie_notes";
CREATE UNIQUE INDEX "movie_notes_user_id_key" ON "movie_notes"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
