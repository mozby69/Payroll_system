/*
  Warnings:

  - You are about to drop the column `Absence` on the `employee_payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Allowance` on the `employee_payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Ecola` on the `employee_payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Late` on the `employee_payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employee_payroll` DROP COLUMN `Absence`,
    DROP COLUMN `Allowance`,
    DROP COLUMN `Ecola`,
    DROP COLUMN `Late`;
