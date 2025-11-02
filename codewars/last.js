// Find the last element of the given argument(s). If a single argument is passed and is a list/array or a string, return its last element. It is guaranteed that there will be at least one argument and that single-argument arrays/lists/strings will not be empty.

// Examples
// last(5)               ==> 5
// last([1, 2, 3, 4])    ==>  4
// last("xyz")           ==> "z"
// last(1, 2, 3, 4)      ==>  4
// last([1, 2], [3, 4])  ==>  [3, 4]
// last([[1, 2], [3, 4]])  ==>  [3, 4]

function last(...args) {
  let value = args.length > 1 ? args : args[0];

  if (Array.isArray(value) || typeof value === 'string') {
    return value[value.length - 1];
  }

  if (typeof value === 'number') {
    return value % 10;
  }

  return value;
}
