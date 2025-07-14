-- CreateTable
CREATE TABLE `Payslip_Archive` (
    `PayCycle` VARCHAR(20) NOT NULL,
    `PayDate` VARCHAR(20) NULL,
    `GrossPay` VARCHAR(20) NULL,
    `TotalDeduct` VARCHAR(20) NULL,
    `NetPay` VARCHAR(20) NULL,
    `Contribution` VARCHAR(20) NULL,
    `CurrentDate` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Path` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`PayCycle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
