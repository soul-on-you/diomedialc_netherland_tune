export default function (addMonthLeaseTerm) {
    const now = new Date();
    now.setMonth(now.getMonth() + addMonthLeaseTerm);
    return now.toISOString().slice(0, 10);
  }
  