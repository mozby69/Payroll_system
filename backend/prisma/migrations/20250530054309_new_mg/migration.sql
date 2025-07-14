-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branches` (
    `BranchCode` VARCHAR(20) NOT NULL,
    `Company` VARCHAR(50) NULL,
    `Location` VARCHAR(50) NULL,
    `Employees` VARCHAR(10) NULL,
    `BranchImage` VARCHAR(100) NULL,

    PRIMARY KEY (`BranchCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `EmpCode` VARCHAR(20) NOT NULL,
    `IdNo` VARCHAR(5) NULL,
    `Firstname` VARCHAR(20) NULL,
    `Middlename` VARCHAR(20) NULL,
    `Lastname` VARCHAR(20) NULL,
    `Suffix` VARCHAR(5) NULL,
    `DateofBirth` DATETIME(3) NULL,
    `BirthPlace` VARCHAR(50) NULL,
    `Age` VARCHAR(5) NULL,
    `BloodType` VARCHAR(3) NULL,
    `Gender` VARCHAR(8) NULL,
    `CivilStatus` VARCHAR(10) NULL,
    `Address` VARCHAR(200) NULL,
    `HomeAddress` VARCHAR(200) NULL,
    `PhoneNo` VARCHAR(12) NULL,
    `Email` VARCHAR(50) NULL,
    `Position` VARCHAR(50) NOT NULL,
    `Department` VARCHAR(50) NULL,
    `EmployementDate` DATETIME(3) NULL,
    `EmploymentStatus` VARCHAR(15) NULL,
    `EmployeeStatus` VARCHAR(15) NULL,
    `EmpImage` VARCHAR(50) NULL,
    `BranchCode_id` VARCHAR(20) NULL,
    `ApprovedId_id` VARCHAR(20) NULL,

    PRIMARY KEY (`EmpCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employeepr` (
    `Payrollid` VARCHAR(20) NOT NULL,
    `BasicSalary` VARCHAR(30) NULL,
    `Allowance` VARCHAR(20) NULL,
    `Ecola` VARCHAR(30) NULL,
    `EmpTin` VARCHAR(30) NULL,
    `EmpSSSNo` VARCHAR(30) NULL,
    `EmpPhilhlthNo` VARCHAR(30) NULL,
    `EmpPagibigNo` VARCHAR(30) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`Payrollid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empprevemployer` (
    `EmpEducBgID` INTEGER NOT NULL AUTO_INCREMENT,
    `EmployerName` VARCHAR(50) NULL,
    `EmployerOccupation` VARCHAR(50) NULL,
    `EmployerYear` VARCHAR(30) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`EmpEducBgID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_BranchCode_id_fkey` FOREIGN KEY (`BranchCode_id`) REFERENCES `branches`(`BranchCode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeepr` ADD CONSTRAINT `employeepr_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empprevemployer` ADD CONSTRAINT `empprevemployer_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
