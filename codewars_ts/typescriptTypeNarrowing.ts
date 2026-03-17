// The new intern needs help! He has been learning Typescript for the first time, but is having trouble convincing the compiler that his types are ok. Can you help him make his code compile?

// Making the code typecheck and compile correctly is all you need to do to pass this kata. The full tests are identical to the sample tests

// Fix this function to make the code compile correctly!
// export function isPair(arr: any[]): boolean {
//   return arr.length == 2;
// }

export function isPair<T>(arr: T[]): arr is [T, T] {
  return arr.length === 2;
}