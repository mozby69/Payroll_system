-- AlterTable
ALTER TABLE `employee_payroll` ADD COLUMN `pagibig_id` INTEGER NULL,
    ADD COLUMN `sss_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `employee_payroll` ADD CONSTRAINT `employee_payroll_pagibig_id_fkey` FOREIGN KEY (`pagibig_id`) REFERENCES `pagibig_list`(`pagibig_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_payroll` ADD CONSTRAINT `employee_payroll_sss_id_fkey` FOREIGN KEY (`sss_id`) REFERENCES `sss_list`(`sss_id`) ON DELETE SET NULL ON UPDATE CASCADE;
