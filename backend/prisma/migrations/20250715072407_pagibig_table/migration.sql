/*
  Warnings:

  - The primary key for the `pagibig_list` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `employee_payroll` DROP FOREIGN KEY `employee_payroll_pagibig_id_fkey`;

-- DropIndex
DROP INDEX `employee_payroll_pagibig_id_fkey` ON `employee_payroll`;

-- AlterTable
ALTER TABLE `employee_payroll` MODIFY `pagibig_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pagibig_list` DROP PRIMARY KEY,
    MODIFY `pagibig_id` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`pagibig_id`);

-- AddForeignKey
ALTER TABLE `employee_payroll` ADD CONSTRAINT `employee_payroll_pagibig_id_fkey` FOREIGN KEY (`pagibig_id`) REFERENCES `pagibig_list`(`pagibig_id`) ON DELETE SET NULL ON UPDATE CASCADE;
