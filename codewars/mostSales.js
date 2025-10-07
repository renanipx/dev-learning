// You work in the best consumer electronics corporation, and your boss wants to find out which three products generate the most revenue. Given 3 lists of the same length like these:

// products: ["Computer", "Cell Phones", "Vacuum Cleaner"]
// amounts: [3, 24, 8]
// prices: [199, 299, 399]
// Return the three product names with the highest revenues (amount * price), in descending order (highest to lowest revenue).

// Note: if multiple products have the same revenue, order them according to their original positions in the input list.

function top3(products, amounts, prices) {
  const totalValues = products.map((product, i) => ({
    name: product,
    total: amounts[i] * prices[i]
  }));

  totalValues.sort((a, b) => b.total - a.total);

  return totalValues.slice(0, 3).map(item => item.name);
}
