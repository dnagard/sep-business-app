-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'seniorcustomerservice',
    "status" TEXT NOT NULL DEFAULT 'review',
    "clientName" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME NOT NULL,
    "numAttend" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL DEFAULT 0,
    "decorations" BOOLEAN NOT NULL,
    "parties" BOOLEAN NOT NULL,
    "photos" BOOLEAN NOT NULL,
    "meals" BOOLEAN NOT NULL,
    "drinks" BOOLEAN NOT NULL,
    "finNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_EventRequest" ("clientName", "createdAt", "decorations", "drinks", "eventType", "finNote", "fromDate", "id", "meals", "memo", "nextAction", "numAttend", "parties", "photos", "status", "toDate") SELECT "clientName", "createdAt", "decorations", "drinks", "eventType", "finNote", "fromDate", "id", "meals", "memo", "nextAction", "numAttend", "parties", "photos", "status", "toDate" FROM "EventRequest";
DROP TABLE "EventRequest";
ALTER TABLE "new_EventRequest" RENAME TO "EventRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
