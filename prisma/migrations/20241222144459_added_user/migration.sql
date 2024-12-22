-- AlterTable
ALTER TABLE `Activity` MODIFY `attackType` ENUM('NULL', 'SQLI', 'NOSQLI', 'XSS', 'SSRF', 'CMDI', 'LFI', 'HTMLI', 'CSSI', 'XXE') NOT NULL DEFAULT 'NULL',
    MODIFY `severity` ENUM('NULL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NULL DEFAULT 'NULL';

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
