-- CreateTable
CREATE TABLE "public"."Upgrades" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boneDiggers" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Upgrades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upgrades_userId_key" ON "public"."Upgrades"("userId");

-- AddForeignKey
ALTER TABLE "public"."Upgrades" ADD CONSTRAINT "Upgrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
