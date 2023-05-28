const os = require("os");

console.log(os.platform());
console.log(os.arch());

const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
