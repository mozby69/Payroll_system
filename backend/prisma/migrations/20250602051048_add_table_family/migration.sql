-- CreateTable
CREATE TABLE `empsiblings` (
    `EmpSiblingID` INTEGER NOT NULL AUTO_INCREMENT,
    `SiblingName` VARCHAR(50) NULL,
    `SiblingBirthday` DATE NULL,
    `SiblingBirthplace` VARCHAR(50) NULL,
    `FamilyBgrndID_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`EmpSiblingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empspouse` (
    `EmpSpousedID` INTEGER NOT NULL AUTO_INCREMENT,
    `EmpSpouseName` VARCHAR(50) NULL,
    `EmpSpouseBirthday` DATE NULL,
    `EmpSpouseBplace` VARCHAR(50) NULL,
    `EmpSpouseOccup` VARCHAR(30) NULL,
    `EmpSpouseEmployer` VARCHAR(50) NULL,
    `EmpSpouseEmpAdd` VARCHAR(50) NULL,
    `FamilyBgrndID_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`EmpSpousedID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmpChildren` (
    `EmpChildrenID` INTEGER NOT NULL AUTO_INCREMENT,
    `EmpChildrenName` VARCHAR(50) NULL,
    `EmpChildrenBirthday` DATE NULL,
    `EmpChildrenBplace` VARCHAR(50) NULL,
    `FamilyBgrndID_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`EmpChildrenID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empsiblings` ADD CONSTRAINT `empsiblings_FamilyBgrndID_id_fkey` FOREIGN KEY (`FamilyBgrndID_id`) REFERENCES `familybgrnd`(`FamilyBgrndID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empspouse` ADD CONSTRAINT `empspouse_FamilyBgrndID_id_fkey` FOREIGN KEY (`FamilyBgrndID_id`) REFERENCES `familybgrnd`(`FamilyBgrndID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpChildren` ADD CONSTRAINT `EmpChildren_FamilyBgrndID_id_fkey` FOREIGN KEY (`FamilyBgrndID_id`) REFERENCES `familybgrnd`(`FamilyBgrndID`) ON DELETE RESTRICT ON UPDATE CASCADE;
