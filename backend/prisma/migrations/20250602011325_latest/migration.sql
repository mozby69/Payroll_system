/*
  Warnings:

  - The primary key for the `employeepr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `Payrollid` on the `employeepr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.

*/
-- AlterTable
ALTER TABLE `employeepr` DROP PRIMARY KEY,
    MODIFY `Payrollid` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Payrollid`);

-- CreateTable
CREATE TABLE `empeducbg` (
    `EmpEducBgID` INTEGER NOT NULL AUTO_INCREMENT,
    `ElEmpEducSchool` VARCHAR(50) NULL,
    `ElEmpEducCourse` VARCHAR(30) NULL,
    `ElEmpEducYearAttended` DATE NULL,
    `HighEmpEducSchool` VARCHAR(50) NULL,
    `HighEmpEducCourse` VARCHAR(30) NULL,
    `HighEmpEducYearAttended` DATE NULL,
    `GradEmpEducSchool` VARCHAR(50) NULL,
    `GradEmpEducCourse` VARCHAR(30) NULL,
    `GradEmpEducYearAttended` DATE NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`EmpEducBgID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empeducbg` ADD CONSTRAINT `empeducbg_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
