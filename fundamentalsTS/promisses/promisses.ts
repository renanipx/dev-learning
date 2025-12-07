// 1. Callback example
function processData(data, callback) {
  setTimeout(() => {
    callback(`Processed: ${data}`);
  }, 1000);
}

processData("Sample data", (result) => {
  console.log(result);
});

// -----------------------------------------------------------

// 2. Promise example (resolve or reject)
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve("User data loaded");
      } else {
        reject("Failed to load user");
      }
    }, 1500);
  });
}

fetchUser()
  .then(message => console.log(message))
  .catch(error => console.log(error));

// -----------------------------------------------------------

// 3. Promise chaining
function doubleNumber(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n * 2), 800);
  });
}

doubleNumber(5)
  .then(result => doubleNumber(result)) 
  .then(result => doubleNumber(result))
  .then(finalResult => console.log("Final result:", finalResult));

// -----------------------------------------------------------

// 4. Promise.all
const task1 = new Promise(resolve => setTimeout(() => resolve("Task 1 done"), 1000));
const task2 = new Promise(resolve => setTimeout(() => resolve("Task 2 done"), 500));
const task3 = new Promise(resolve => setTimeout(() => resolve("Task 3 done"), 2000));

Promise.all([task1, task2, task3])
  .then(results => {
    console.log("All tasks finished:", results);
  });

// -----------------------------------------------------------

// 5. Promise.race
Promise.race([task1, task2, task3])
  .then(fastest => {
    console.log("First finished:", fastest);
  });
