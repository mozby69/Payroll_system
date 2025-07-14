/*
  Warnings:

  - You are about to drop the column `sss_id` on the `employee_payroll` table. All the data in the column will be lost.
  - You are about to drop the `payroll_archive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sss_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `employee_payroll` DROP FOREIGN KEY `employee_payroll_sss_id_fkey`;

-- DropForeignKey
ALTER TABLE `payroll_archive` DROP FOREIGN KEY `payroll_archive_EmpCode_id_fkey`;

-- DropForeignKey
ALTER TABLE `sss_list` DROP FOREIGN KEY `sss_list_EmpCode_id_fkey`;

-- DropIndex
DROP INDEX `employee_payroll_sss_id_fkey` ON `employee_payroll`;

-- AlterTable
ALTER TABLE `employee_payroll` DROP COLUMN `sss_id`;

-- DropTable
DROP TABLE `payroll_archive`;

-- DropTable
DROP TABLE `sss_list`;
