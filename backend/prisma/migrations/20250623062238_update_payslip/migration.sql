/*
  Warnings:

  - You are about to drop the column `Contribution` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to drop the column `TotalDeduct` on the `payslip_archive` table. All the data in the column will be lost.
  - You are about to alter the column `GrossPay` on the `payslip_archive` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Decimal(10,2)`.
  - You are about to alter the column `NetPay` on the `payslip_archive` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Decimal(10,2)`.
  - Added the required column `SSS_Contribution` to the `Payslip_Archive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payslip_archive` DROP COLUMN `Contribution`,
    DROP COLUMN `TotalDeduct`,
    ADD COLUMN `Absent` DECIMAL(10, 2) NULL,
    ADD COLUMN `Calamity_Loan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Fch_Loan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Housing_Loan` DECIMAL(10, 2) NULL,
    ADD COLUMN `Late` DECIMAL(10, 2) NULL,
    ADD COLUMN `OverPay` DECIMAL(10, 2) NULL,
    ADD COLUMN `Pagibig_Contribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `Philhealth_Contribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `SSS_Contribution` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `Salary_Loan` DECIMAL(10, 2) NULL,
    ADD COLUMN `total_contribution` DECIMAL(10, 2) NULL,
    ADD COLUMN `total_dedection` DECIMAL(10, 2) NULL,
    MODIFY `GrossPay` DECIMAL(10, 2) NULL,
    MODIFY `NetPay` DECIMAL(10, 2) NULL;
