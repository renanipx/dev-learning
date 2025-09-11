// You are given a string s consisting of lowercase English letters.

// Your task is to find the maximum difference diff = freq(a1) - freq(a2) between the frequency of characters a1 and a2 in the string such that:

// a1 has an odd frequency in the string.
// a2 has an even frequency in the string.
// Return this maximum difference.

 

// Example 1:

// Input: s = "aaaaabbc"

// Output: 3

// Explanation:

// The character 'a' has an odd frequency of 5, and 'b' has an even frequency of 2.
// The maximum difference is 5 - 2 = 3.
// Example 2:

// Input: s = "abcabcab"

// Output: 1

// Explanation:

// The character 'a' has an odd frequency of 3, and 'c' has an even frequency of 2.
// The maximum difference is 3 - 2 = 1.
 

// Constraints:

// 3 <= s.length <= 100
// s consists only of lowercase English letters.
// s contains at least one character with an odd frequency and one with an even frequency.

/**
 * @param {string} s
 * @return {number}
 */
var maxDifference = function (s) {
    let arrayLetter = [...new Set(s.split('').sort())];
    let oddFrequency = 0;
    let evenFrequency = Infinity;

    for (let letter of arrayLetter) {
        let length = s.split('').filter((x) => x === letter).length;

        if (length % 2 === 0) { // even
            if (length < evenFrequency) {
                evenFrequency = length;
            }
        } else { // odd
            if (length > oddFrequency) {
                oddFrequency = length;
            }
        }
    }

    return oddFrequency - evenFrequency;
};