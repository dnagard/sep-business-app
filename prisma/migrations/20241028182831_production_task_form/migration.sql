-- CreateTable
CREATE TABLE "productionRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'productionteam',
    "team" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "personell" INTEGER NOT NULL,
    "dueDate" TEXT NOT NULL,
    "planNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
