
export const parsePayCodeToDate = (payCode: string): Date => {
    const parts = payCode.split("-");
    const month = parts[0];
    const day = parts[1];
    const year = parts[3];
    return new Date(`${month} ${day}, ${year}`);
  };
  
  export const getMostRecentPayCode = (payCodes: { PayCode: string }[]): string | undefined => {
    if (!payCodes.length) return undefined;
  
    const sorted = [...payCodes].sort((a, b) => {
      const dateA = parsePayCodeToDate(a.PayCode);
      const dateB = parsePayCodeToDate(b.PayCode);
      return dateB.getTime() - dateA.getTime(); 
    });
  
    return sorted[0].PayCode;
};
  

