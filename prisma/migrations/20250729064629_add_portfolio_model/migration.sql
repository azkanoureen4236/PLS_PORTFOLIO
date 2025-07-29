-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "border" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);
