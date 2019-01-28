// _id: 5c4f48943686bc098c7f2953
// 12 bytes
  // 4B: timestamp
  // 3B: machine id
  // 2B: process id
  // 3B: counter

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

console.log(mongoose.Types.ObjectId.isValid('1234'));
