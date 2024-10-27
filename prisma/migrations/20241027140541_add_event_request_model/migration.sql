-- CreateTable
CREATE TABLE "EventRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromDate" DATETIME NOT NULL,
    "toDate" DATETIME NOT NULL,
    "numAttend" INTEGER NOT NULL,
    "decorations" BOOLEAN NOT NULL,
    "parties" BOOLEAN NOT NULL,
    "photos" BOOLEAN NOT NULL,
    "meals" BOOLEAN NOT NULL,
    "drinks" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
