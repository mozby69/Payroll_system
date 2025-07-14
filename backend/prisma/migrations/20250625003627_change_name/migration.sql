/*
  Warnings:

  - You are about to drop the column `Absent` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Calamity_Loan` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `FCH_Loan` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `GrossPay` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Housing_Loan` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Late` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `NetPay` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Overtime_pay` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Pagibig_Contribution` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Philhealth_Contribution` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `SSS_Contribution` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `Salary_Loan` on the `payslip_archive` table. All the data in the column will be lost.
  - Added the required column `Total_SSSContribution` to the `Payslip_Archive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payslip_archive` DROP COLUMN `Absent`,
    DROP COLUMN `Calamity_Loan`,
    DROP COLUMN `FCH_Loan`,
    DROP COLUMN `GrossPay`,
    DROP COLUMN `Housing_Loan`,
    DROP COLUMN `Late`,
    DROP COLUMN `NetPay`,
    DROP COLUMN `Overtime_pay`,
    DROP COLUMN `Pagibig_Contribution`,
    DROP COLUMN `Philhealth_Contribution`,
    DROP COLUMN `SSS_Contribution`,
    DROP COLUMN `Salary_Loan`,
    ADD COLUMN `Total_Absent` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_CalamityLoan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_FCHLoan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_GrossPay` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_HousingLoan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_Late` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_NetPay` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_OverTimePay` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_PagibigContribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_PhilhealthContribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `Total_SSSContribution` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `Total_SalaryLoan` DECIMAL(10, 2) NULL;
