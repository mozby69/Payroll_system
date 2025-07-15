export type PreparePayroll = {
    PayCode: string;
    EmpCodeId: string;
    LateCount: string;
    TotalAbsentHours: string;
    TotalUndertime?: string;
    TotalOvertime: string;
    basic_salary:string;
    OvertimeAtt?:string;
    NightShiftAtt?:string;
    RegularAtt?:string;
    NightShiftOtAtt?:string;
    GrossPay:string;
    
};


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
  const [hh, mm] = timeStr.split(":");
  return parseFloat(`${parseInt(hh)}.${mm}`);
};



const computeFromSource = (labelMap: Record<string, number>, source: Record<string, string>, dailyRate: number): number => {
  let total = 0;
  for (const key in source) {
    const multiplier = labelMap[key];
    if (!multiplier) continue;

    const hours = toFloatHM(source[key]); 
    const DailyPay = parseFloat(dailyRate.toFixed(1)) * multiplier;
    const OT_RATE = (DailyPay / 8) * 1.25;
    const OT_PAY = OT_RATE * hours;
    const result = Math.floor(OT_PAY * 100) / 100;
    // const result = OT_PAY;
    total += result + DailyPay;
  }
  return total;
};





const Computation = {
    all: (emp: PreparePayroll) => {
      const salary = parseFloat(emp.basic_salary);
     
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
        computeFromSource(overtimeLabels, overtimeAtt, dailyRate) +
        computeFromSource(nightShiftLabels, nightShiftAtt, dailyRate) +
        computeFromSource(regularLabels, regularAtt, dailyRate) +
        computeFromSource(nightShiftOtLabels, nightShiftOtAtt, dailyRate);
  
        const grosspay = (salary / 2) - parseFloat(late_result) - parseFloat(absent_result) + totalOvertimeAmount;
        const final_grosspay = grosspay.toFixed(2);


      return {
        totalOvertimeAmount,
        late_result,
        absent_result,
        final_grosspay,
      };
    },
    
  };
  

  


export default Computation;