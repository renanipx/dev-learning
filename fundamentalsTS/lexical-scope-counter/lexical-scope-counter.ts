const createCounter = () => {
    let count = 0;
    return {
        increment: () => count++,
        decrement: () => count--,
        get: () => count
    }
}

const counter = createCounter();
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.get());