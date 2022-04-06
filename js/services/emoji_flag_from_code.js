export default function (emojiCountryCode) {
  // return `${String.fromCharCode(
  //   "0x" + emojiCountryCode.slice(0, 5),
  //   "0x" + emojiCountryCode.slice(5, 10)
  // )}`;
  // return (
  //   "\u{" +
  //   emojiCountryCode.slice(0, 5) +
  //   "}\u{" +
  //   emojiCountryCode.slice(5, 10) +
  //   "}"
  // );
  return `\u{00000}\u{11111}`;
  // .replace("00000", `${emojiCountryCode.slice(0, 5)}`)
  // .replace("11111", `${emojiCountryCode.slice(5, 10)}`);
}

// const emojiCountryCode= '1F1F31F1F1';

// console.log(`\u{${emojiCountryCode.slice(0, 5)}}`);
// console.log(emojiCountryCode.slice(5,10));

// console.log("\u{1F310}");

// console.log(parseInt("1F310", 16));

// console.log("🌐".charCodeAt(0));
// console.log("🌐".charCodeAt(1));
// // const a = String.fromCharCode("🌐".charCodeAt());
// // console.log(a.charCodeAt());

// function findSurrogatePair(point) {
//   // assumes point > 0xffff
//   var offset = point - 0x10000,
//     lead = 0xd800 + (offset >> 10),
//     trail = 0xdc00 + (offset & 0x3ff);
//   return [lead.toString(16), trail.toString(16)];
// }

// // find pair for U+1F600
// const code1 = "1F1F3";
// const pair1 = findSurrogatePair(`0x${code1}`); // [ 'd83c', 'ddf3' ]
// console.log(pair1);

// const code2 = "1F1F1";
// const pair2 = findSurrogatePair(`0x${code2}`); // [ 'd83c', 'ddf1' ]
// console.log(pair2);

// console.log(parseInt("1F310", 16));
// console.log(parseInt("d83c", 16));

// const c0 = String.fromCharCode(parseInt("0x" + "1F310", 16));
// const c1 = String.fromCharCode(parseInt("0x" + "d83c", 16));

// console.log(c0);
// console.log(c1);

// console.log(parseInt(c0));
// console.log(parseInt(c1));

// console.log("A".charCodeAt());

// console.log(parseInt(65, 16));

// const n = 65;
// console.log(String.fromCharCode("0x00" + n.toString(16), 16));

// console.log("".charCodeAt(0));
