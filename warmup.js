
const randomChoose= (x, y) => [x,y][Math.random() < 0.5 ? 0 : 1];

const a = randomChoose("foo", "bar");
const b = randomChoose(1, 2);
const c = randomChoose([["foo"], ["bar"]]);

console.log(a);
console.log(b);
console.log(c);