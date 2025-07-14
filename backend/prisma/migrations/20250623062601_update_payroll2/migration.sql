/*
  Warnings:

  - You are about to drop the column `Fch_Loan` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `OverPay` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `total_contribution` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `total_dedection` on the `payslip_archive` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payslip_archive` DROP COLUMN `Fch_Loan`,
    DROP COLUMN `OverPay`,
    DROP COLUMN `total_contribution`,
    DROP COLUMN `total_dedection`,
    ADD COLUMN `FCH_Loan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Overtime_pay` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_Contribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_Deduction` DECIMAL(10, 2) NULL;
