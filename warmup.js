
const randomChoose= (...x) => x[Math.floor(Math.random() * x.length)];

const a = randomChoose("foo", "bar");
const b = randomChoose(1, 2);
const c = randomChoose([["foo"], ["bar"]]);

console.log(a);
console.log(b);
console.log(c);