-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_financeRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'financialmanager',
    "department" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "desiredBudget" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'reivew',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_financeRequest" ("budget", "createdAt", "department", "desiredBudget", "id", "nextAction", "reason", "status") SELECT "budget", "createdAt", "department", "desiredBudget", "id", "nextAction", "reason", "status" FROM "financeRequest";
DROP TABLE "financeRequest";
ALTER TABLE "new_financeRequest" RENAME TO "financeRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
