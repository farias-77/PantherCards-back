-- CreateTable
CREATE TABLE "deckResults" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "deckResults_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deckResults" ADD CONSTRAINT "deckResults_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deckResults" ADD CONSTRAINT "deckResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
