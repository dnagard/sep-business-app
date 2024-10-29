-- CreateTable
CREATE TABLE "staffRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'humanresources',
    "currStaff" INTEGER NOT NULL,
    "requiredStaff" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'reivew',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "financeRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'financeManager',
    "budget" INTEGER NOT NULL,
    "desiredBudget" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'reivew',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
