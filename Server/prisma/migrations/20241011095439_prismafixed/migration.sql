/*
  Warnings:

  - You are about to drop the column `coverProfileImageUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `manga` MODIFY `views` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `coverProfileImageUrl`,
    ADD COLUMN `profileImage` VARCHAR(191) NULL;
