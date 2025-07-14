/*
  Warnings:

  - You are about to drop the column `RegHolidayOt` on the `employee_summary` table. All the data in the column will be lost.
  - You are about to drop the column `SpecialOt` on the `employee_summary` table. All the data in the column will be lost.
  - You are about to drop the column `WeekdayOt` on the `employee_summary` table. All the data in the column will be lost.
  - You are about to drop the column `WeekendOt` on the `employee_summary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employee_summary` DROP COLUMN `RegHolidayOt`,
    DROP COLUMN `SpecialOt`,
    DROP COLUMN `WeekdayOt`,
    DROP COLUMN `WeekendOt`,
    ADD COLUMN `NightShiftAtt` JSON NULL,
    ADD COLUMN `NightShiftOtAtt` JSON NULL,
    ADD COLUMN `OvertimeAtt` JSON NULL,
    ADD COLUMN `RegularAtt` JSON NULL;
