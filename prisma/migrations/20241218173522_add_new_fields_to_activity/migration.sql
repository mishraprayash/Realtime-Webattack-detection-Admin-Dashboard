-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `misClassified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `predictionProbability` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `severity` ENUM('CRITICAL', 'HIGH', 'MEDIUM', 'LOW') NULL;
