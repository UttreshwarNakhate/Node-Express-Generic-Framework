/*
  Warnings:

  - You are about to drop the `rolemaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userrole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_roleInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_userInfoId_fkey`;

-- DropTable
DROP TABLE `rolemaster`;

-- DropTable
DROP TABLE `userrole`;
