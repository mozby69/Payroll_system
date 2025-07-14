/*
  Warnings:

  - You are about to drop the column `GrossPay` on the `employee_payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employee_payroll` DROP COLUMN `GrossPay`,
    MODIFY `basic_salary` DECIMAL(10, 2) NULL;
