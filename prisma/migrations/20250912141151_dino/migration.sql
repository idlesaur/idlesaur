-- CreateEnum
CREATE TYPE "public"."DinoType" AS ENUM ('RAPTOR', 'TYRANNOSAURUS');

-- AlterTable
ALTER TABLE "public"."Upgrades" ADD COLUMN     "dinosaurCapacity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Dinosaur" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "nextLevelExperience" INTEGER NOT NULL DEFAULT 10,
    "health" INTEGER NOT NULL DEFAULT 10,
    "maxHealth" INTEGER NOT NULL DEFAULT 10,
    "attack" INTEGER NOT NULL DEFAULT 5,
    "defense" INTEGER NOT NULL DEFAULT 5,
    "speed" INTEGER NOT NULL DEFAULT 5,
    "special" INTEGER NOT NULL DEFAULT 5,
    "specialDefense" INTEGER NOT NULL DEFAULT 5,
    "type" "public"."DinoType" NOT NULL DEFAULT 'RAPTOR',

    CONSTRAINT "Dinosaur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dinosaur_userId_key" ON "public"."Dinosaur"("userId");

-- AddForeignKey
ALTER TABLE "public"."Dinosaur" ADD CONSTRAINT "Dinosaur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
