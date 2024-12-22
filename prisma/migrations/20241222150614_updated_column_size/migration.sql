-- AlterTable
ALTER TABLE `Activity` MODIFY `endpoint` MEDIUMTEXT NOT NULL,
    MODIFY `attackType` ENUM('NULL', 'SQLI', 'NOSQLI', 'XSS', 'SSRF', 'CMDI', 'LFI', 'HTMLI', 'CSSI', 'XXE') NOT NULL DEFAULT 'NULL',
    MODIFY `attackPayload` LONGTEXT NULL,
    MODIFY `severity` ENUM('NULL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NULL DEFAULT 'NULL';