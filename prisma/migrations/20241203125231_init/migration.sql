-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `endpoint` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `category` ENUM('NORMAL', 'MALICIOUS') NOT NULL DEFAULT 'NORMAL',
    `attackType` ENUM('NULL', 'SQLI', 'NOSQLI', 'XSS', 'SSRF', 'CMDI', 'LFI', 'HTMLI', 'CSSI', 'XXE') NOT NULL DEFAULT 'NULL',
    `attackPayload` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
