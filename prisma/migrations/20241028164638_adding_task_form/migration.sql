-- CreateTable
CREATE TABLE "serviceRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextAction" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "personell" INTEGER NOT NULL,
    "dueDate" TEXT NOT NULL
);
