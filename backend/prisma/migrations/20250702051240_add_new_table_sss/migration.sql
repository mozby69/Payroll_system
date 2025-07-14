-- CreateTable
CREATE TABLE `sss_contributions` (
    `sss_contrib_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_range` DECIMAL(10, 2) NULL,
    `end_range` DECIMAL(10, 2) NULL,
    `employer_share` DECIMAL(10, 2) NULL,
    `employee_share` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`sss_contrib_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
