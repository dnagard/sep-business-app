-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_serviceRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'serviceteam',
    "team" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "personell" INTEGER NOT NULL,
    "dueDate" TEXT NOT NULL,
    "planNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_serviceRequest" ("activity", "budget", "dueDate", "id", "nextAction", "personell", "team") SELECT "activity", "budget", "dueDate", "id", "nextAction", "personell", "team" FROM "serviceRequest";
DROP TABLE "serviceRequest";
ALTER TABLE "new_serviceRequest" RENAME TO "serviceRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
