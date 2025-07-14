-- CreateTable
CREATE TABLE `pagibig_list` (
    `pagibig_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pagibig_employee_share` DECIMAL(10, 2) NULL,
    `pagibig_employer_share` DECIMAL(10, 2) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`pagibig_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sss_list` (
    `sss_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sss_employee_share` DECIMAL(10, 2) NULL,
    `sss_employer_share` DECIMAL(10, 2) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`sss_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pagibig_list` ADD CONSTRAINT `pagibig_list_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sss_list` ADD CONSTRAINT `sss_list_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
