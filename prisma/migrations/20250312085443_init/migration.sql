-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "ville" JSONB NOT NULL,
    "image" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfUpdate" TIMESTAMP(3) NOT NULL,
    "seeLastConnexion" BOOLEAN NOT NULL,
    "maskProfil" BOOLEAN NOT NULL,
    "activeCompte" INTEGER NOT NULL,
    "uid" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
