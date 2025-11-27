async function test() {
  console.log("A");

  setTimeout(() => console.log("B"), 0);

  await Promise.resolve().then(() => console.log("C"));

  console.log("D");

  setTimeout(() => console.log("E"), 0);

  Promise.resolve().then(() => console.log("F"));

  console.log("G");
}

test();

console.log("H");