-- CreateTable
CREATE TABLE `employee_summary` (
    `PayCode` VARCHAR(20) NOT NULL,
    `TotalHoursWorked` VARCHAR(20) NULL,
    `LateCount` VARCHAR(20) NULL,
    `TotalAbsentHours` VARCHAR(20) NULL,
    `TotalUndertime` VARCHAR(20) NULL,
    `TotalOvertime` VARCHAR(20) NULL,
    `WeekendOt` VARCHAR(20) NULL,
    `WeekdayOt` VARCHAR(20) NULL,
    `SpecialOt` VARCHAR(20) NULL,
    `RegHolidayOt` VARCHAR(20) NULL,
    `EmpCode_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`PayCode`, `EmpCode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_summary` ADD CONSTRAINT `employee_summary_EmpCode_id_fkey` FOREIGN KEY (`EmpCode_id`) REFERENCES `employee`(`EmpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
