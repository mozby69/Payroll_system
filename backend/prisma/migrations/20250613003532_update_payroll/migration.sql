/*
  Warnings:

  - Added the required column `Absence` to the `employee_payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GrossPay` to the `employee_payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Late` to the `employee_payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_payroll` ADD COLUMN `Absence` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `GrossPay` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `Late` DECIMAL(10, 2) NOT NULL;
