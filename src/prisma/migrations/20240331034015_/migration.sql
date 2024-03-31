-- CreateTable
CREATE TABLE "ValidateEmail" (
    "id" VARCHAR(36) NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidateEmail_id_key" ON "ValidateEmail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ValidateEmail_email_key" ON "ValidateEmail"("email");
