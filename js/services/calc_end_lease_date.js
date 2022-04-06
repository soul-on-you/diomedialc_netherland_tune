export default function (addMonthLeaseTerm) {
  const now = new Date();
  now.setMonth(now.getMonth() + addMonthLeaseTerm);
  return now.toLocaleDateString();
}

// const now = new Date();
// console.log(now);
// console.log(now.toLocaleDateString());
// console.log(now.toISOString());
// console.log(now.toDateString());
// console.log(now.toUTCString());
// console.log(now.toDateString());
// console.log(now.toString());
// now.setMonth(now.getMonth() + 11);
// console.log(now);
// console.log(new Date(now.getYear(), now.getMonth(), now.getDay()));
