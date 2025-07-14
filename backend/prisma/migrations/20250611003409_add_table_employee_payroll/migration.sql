-- CreateTable
CREATE TABLE `employee_payroll` (
    `payroll_id` INTEGER NOT NULL AUTO_INCREMENT,
    `basic_salary` INTEGER NOT NULL,
    `Allowance` INTEGER NOT NULL,
    `Ecola` INTEGER NOT NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`payroll_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_payroll` ADD CONSTRAINT `employee_payroll_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
