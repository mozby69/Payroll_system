-- CreateTable
CREATE TABLE `payroll_parameters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingName` VARCHAR(100) NULL,
    `SettingPercentage` DECIMAL(10, 2) NULL,
    `LastModifiedBy` VARCHAR(100) NULL,
    `LastModifiedDate` DATE NULL,
    `Created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
