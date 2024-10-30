-- CreateTable
CREATE TABLE "EventRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'seniorcustomerservice',
    "status" TEXT NOT NULL DEFAULT 'review',
    "clientName" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME NOT NULL,
    "numAttend" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "decorations" BOOLEAN NOT NULL,
    "parties" BOOLEAN NOT NULL,
    "photos" BOOLEAN NOT NULL,
    "meals" BOOLEAN NOT NULL,
    "drinks" BOOLEAN NOT NULL,
    "finNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "serviceRequest" (
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

-- CreateTable
CREATE TABLE "staffRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL DEFAULT 'humanresources',
    "department" TEXT NOT NULL,
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
    "department" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "desiredBudget" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'reivew',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
