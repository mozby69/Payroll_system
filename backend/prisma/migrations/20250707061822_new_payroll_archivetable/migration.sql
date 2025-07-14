-- CreateTable
CREATE TABLE `employee_payroll_archive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PayCode` VARCHAR(20) NOT NULL,
    `Late` DECIMAL(10, 2) NULL,
    `Absent` DECIMAL(10, 2) NULL,
    `Overtime` DECIMAL(10, 2) NULL,
    `Grosspay` DECIMAL(10, 2) NULL,
    `Netpay` DECIMAL(10, 2) NULL,
    `Basic_salary` DECIMAL(10, 2) NULL,
    `SSS_share` DECIMAL(10, 2) NULL,
    `Pagibig_share` DECIMAL(10, 2) NULL,
    `Philhealth_share` DECIMAL(10, 2) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_payroll_archive` ADD CONSTRAINT `employee_payroll_archive_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
