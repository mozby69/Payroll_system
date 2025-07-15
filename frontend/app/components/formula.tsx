import { PreparePayroll } from "../types/types";



const parseJsonField = (field: string | Record<string, string> | null | undefined): Record<string, string> => {
  if (!field) return {};
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return {};
    }
  }
  return field;
};

const toFloatHM = (timeStr: string): number => {
  if (!timeStr || typeof timeStr !== "string") return 0;
  const [hh, mm] = timeStr.split(":").map(Number);
  return hh + mm / 60;
};

// const toFloatHM = (timeStr: string): number => {
//   if (!timeStr || typeof timeStr !== "string") return 0;
//   const [hh, mm] = timeStr.split(":");
//   return parseFloat(`${parseInt(hh)}.${mm}`);
// };


const computeFromSource = (labelMap: Record<string, number>,source: Record<string, string>,dailyRate: number,isOvertime = false): number => {
  let total = 0;

  for (const key in source) {
    const multiplier = labelMap[key];
    if (!multiplier) continue;

    const hours = toFloatHM(source[key]);
    const adjustedDaily = dailyRate * multiplier;
    const baseHourly = adjustedDaily / 8;
    // const result = isOvertime ? baseHourly * hours : (baseHourly * 1.25) * hours; 
    const result = isOvertime ? (baseHourly * 1.25) * hours : baseHourly * hours; 
    total += parseFloat(result.toFixed(2)); 
  }

  return total;
};



const Computation = {

    all: (emp: PreparePayroll, philhealthRate:number,selectedPayCode:string) => {
      
      const salary = parseFloat(emp.basic_salary);
      const basic_pay = salary / 2;

      const dailyRate = (salary * 12) / 262;
      const perLatePenalty = dailyRate / 32;
  
      const rawLate = Number(emp.LateCount) || 0;
      const late_result = (perLatePenalty * rawLate).toFixed(2);
  
      const rawAbsent = Number(emp.TotalAbsentHours) || 0;
      const absent_result = (dailyRate * rawAbsent).toFixed(2);

      const overtimeAtt = parseJsonField(emp.OvertimeAtt);
      const nightShiftAtt = parseJsonField(emp.NightShiftAtt);
      const regularAtt = parseJsonField(emp.RegularAtt);
      const nightShiftOtAtt = parseJsonField(emp.NightShiftOtAtt);
      
      
  
      const overtimeLabels = {
        "Ordinary Day":1.25,
        "Rest Day": 1.69,
        "Special Day": 1.69,
        "Special Day FRD": 1.95,
        "Regular Holiday": 2.6,
        "Regular HFRD": 3.38,
        "Double RH": 3.9,
        "Double RHFRD":5.07,
      };
  
      const nightShiftLabels = {
        "Ordinary Day":1.1,
        "Rest Day": 1.43,
        "Special Day": 1.43,
        "Special Day FRD": 1.65,
        "Regular Holiday": 2.2,
        "Regular HFRD": 2.86,
        "Double RH": 3.3,
        "Double RHFRD":4.29,
      };
  
      const regularLabels = {
        "Ordinary Day":1,
        "Rest Day": 1.3,
        "Special Day": 1.3,
        "Special Day FRD": 1.5,
        "Regular Holiday": 2,
        "Regular HFRD": 2.6,
        "Double RH": 3,
        "Double RHFRD":3.9,
      };
  
      const nightShiftOtLabels = {
        "Ordinary Day":1.375,
        "Rest Day": 1.859,
        "Special Day": 1.859,
        "Special Day FRD": 2.145,
        "Regular Holiday": 2.86,
        "Regular HFRD": 3.718,
        "Double RH": 4.29,
        "Double RHFRD":5.577,
      };
  
      const totalOvertimeAmount =
        computeFromSource(overtimeLabels, overtimeAtt, dailyRate,true) +
        computeFromSource(nightShiftLabels, nightShiftAtt, dailyRate,false) +
        computeFromSource(regularLabels, regularAtt, dailyRate,false) +
        computeFromSource(nightShiftOtLabels, nightShiftOtAtt, dailyRate,true);

        const isSecondCutoff = selectedPayCode.includes("-15-");
        const philhealth_cont = isSecondCutoff ? basic_pay * philhealthRate : 0;

        const sss_cutoff = selectedPayCode.includes("-15-");
        const sss_result = sss_cutoff ? emp.sss_employee_share : 0;

        const pagibig_cutoff = selectedPayCode.includes("-16-");
        const pagibig_result = pagibig_cutoff ? emp.pagibig_employee_share: 0;

        const grosspay = basic_pay - parseFloat(late_result) - parseFloat(absent_result) + totalOvertimeAmount;
        const final_grosspay = parseFloat(grosspay.toFixed(2));
        const net_pay = final_grosspay - sss_result - pagibig_result - philhealth_cont;
      
 
      return {
        totalOvertimeAmount,
        late_result,
        absent_result,
        final_grosspay,
        net_pay,
        basic_pay,
        philhealth_cont,
        sss_result,
        pagibig_result,

      };

    },

  };
  




export default Computation;