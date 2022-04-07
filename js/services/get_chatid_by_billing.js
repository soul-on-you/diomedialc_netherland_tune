export default function (targetBillID, states) {
  for (const state in states) {
    if (states[state]?.billID == targetBillID) {
      return state;
    }
  }
  return null;
}

// function getBillChatID(targetBillID, states) {
//   for (const state in states) {
//     if (states[state]?.billID == targetBillID) {
//       return state;
//     }
//   }
//   return null;
// }

// const bill = '225951fd-8aa2-491f-a34b-0b6823686c68';
// const states = {
    
//         '1731529362': {
//           serverID: 1,
//           orderCount: 1,
//           billID: '225951fd-8aa2-491f-a34b-0b6823686c68',
//           payUrl: 'https://oplata.qiwi.com/form/'
//         },
      
//   "12794878": {
//     serverID: 2,
//     orderCount: 50,
//   },
// };

// console.log(states[getBillChatID(bill, states)]);

// for (const state in states) {
//   if (states[state]?.billID === "45c0b528-8ced-4dce-8ddc-cdfdc8d76c66") {
//     console.log(state);
//   }
//   console.log(states[state]);
//   // console.log("next");
//   // console.log(states.state);
// }
