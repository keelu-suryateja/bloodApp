-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "requestedBY" TEXT NOT NULL,
    "bloodtype" TEXT NOT NULL,
    "issolved" BOOLEAN NOT NULL DEFAULT false,
    "donor" TEXT NOT NULL DEFAULT 'Anonymous',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "bloodtype" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_requestedBY_key" ON "Post"("requestedBY");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_requestedBY_fkey" FOREIGN KEY ("requestedBY") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
