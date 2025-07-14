-- CreateTable
CREATE TABLE `familybgrnd` (
    `FamilyBgrndID` VARCHAR(20) NOT NULL,
    `MotherMaidenName` VARCHAR(50) NULL,
    `MotherBirthday` DATE NULL,
    `MotherBirthplace` VARCHAR(50) NULL,
    `MotherOccupation` VARCHAR(50) NULL,
    `MotherEmployersName` VARCHAR(50) NULL,
    `MotherEmployersAddress` VARCHAR(50) NULL,
    `FatherName` VARCHAR(50) NULL,
    `FatherBirthday` DATE NULL,
    `FatherBirthplace` VARCHAR(50) NULL,
    `FatherOccupation` VARCHAR(50) NULL,
    `FatherEmployersName` VARCHAR(50) NULL,
    `FatherEmployersAddress` VARCHAR(50) NULL,
    `EmergPersonName` VARCHAR(30) NULL,
    `EmergPersonNo` VARCHAR(15) NULL,
    `EmergPersonAddd` VARCHAR(30) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`FamilyBgrndID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `familybgrnd` ADD CONSTRAINT `familybgrnd_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
