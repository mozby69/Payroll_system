import { prisma } from '../config/db';

export const getDistinctPayCodesForYear = async (year: number) => {
  return await prisma.$queryRaw<{ PayCode: string }[]>`
    SELECT DISTINCT PayCode FROM employee_summary
    WHERE 
      RIGHT(TRIM(PayCode), 4) = ${year.toString()}
    ORDER BY STR_TO_DATE(
      CONCAT(
        SUBSTRING_INDEX(TRIM(PayCode), '-', -1), '-',
        MONTH(STR_TO_DATE(SUBSTRING_INDEX(TRIM(PayCode), '-', 1), '%M')), '-',
        SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(PayCode), '-', -2), '-', 1)
      ),
      '%Y-%m-%d') DESC`;
};
