/*
  Warnings:

  - You are about to alter the column `basic_salary` on the `employee_payroll` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `Allowance` on the `employee_payroll` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `Ecola` on the `employee_payroll` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `employee_payroll` MODIFY `basic_salary` DECIMAL(10, 2) NOT NULL,
    MODIFY `Allowance` DECIMAL(10, 2) NOT NULL,
    MODIFY `Ecola` DECIMAL(10, 2) NOT NULL;
