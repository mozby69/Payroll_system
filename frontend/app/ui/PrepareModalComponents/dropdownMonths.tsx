"use client";
import { useState } from "react";
import styles from '@/public/css/prepare_payroll.module.css';

type GroupedPayCodes = Record<string, string[]>;

interface Props {
  groupedPayCodes: GroupedPayCodes;
  selected: string;
  setSelected: (val: string) => void;
}

const PayrollDropdown: React.FC<Props> = ({groupedPayCodes,selected,setSelected,}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const handleSelect = (code: string) => {
    setSelected(code);
    setIsOpen(false);
    setExpandedMonth(null);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected || "-- Select Payroll Date --"}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {Object.entries(groupedPayCodes).map(([month, codes]) => (
            <div key={month}>
              <div
                className={styles.monthHeader}
                onClick={() =>
                  setExpandedMonth((prev) => (prev === month ? null : month))
                }
              >
                {month}
                <span className={styles.monthArrow}>
                  {expandedMonth === month ? "−" : "+"}
                </span>
              </div>
              {expandedMonth === month &&
                codes.map((code) => (
                  <div
                    key={code}
                    className={styles.dropdownItem}
                    onClick={() => handleSelect(code)}
                  >
                    {code}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PayrollDropdown;









export const groupPayCodesByMonth = (payCodes: string[]) => {
  const grouped: Record<string, string[]> = {};
  payCodes.forEach((code) => {
    const [month] = code.split("-");
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(code);
  });
  return grouped;
};