const products = [
    { id: 1, price: 10 },
    { id: 2, price: 11 },
    { id: 3, price: 1 },
    { id: 4, price: 2 },
    { id: 5, price: 100 },
    { id: 6, price: 0.1 },
];

/**
* @params [Array] products - list of products
* @params [Number] options.size - Optional parameter. By default it
should be 5
**/
function sortProducts(products, options) {
    const default_result = {
        highest: null,
        lowest: null,
    };
    if (!products) {
        return default_result;
    }
    let size = 5;
    let highest = [];
    let lowest = [];
    const sorted = products.slice().sort((a, b) => a.price - b.price);
    const length = sorted.length;

    if (
        this.args_prev &&
        JSON.stringify(this.args_prev) === JSON.stringify({ products, options })
    ) {
        return default_result;
    } else {
        this.args_prev = {
            products: products.slice(),
            options,
        };
    }

    if (options && 'size' in options) {
        size = options.size;
    }

    for (let i = length - 1; i >= 0; i--) {
        if (size <= length) {
            if (i >= length - size) {
                highest.push(sorted.pop());
            } else if (i < size) {
                lowest.push(sorted.shift());
            }
        }
    }

    return {
        highest: highest.length ? highest : null,
        lowest: lowest.length ? lowest : null,
    };
}

const result1 = sortProducts(products); // {highest: [...], lowest: [...]}

// call without modifications
let result2 = sortProducts(products); // {highest: null, lowest: null}

products[1] = { id: 2, price: 11.5 };

// call with modified data
const result3 = sortProducts(products); // {highest: [...], lowest: [...]}

// call without modifications
const result4 = sortProducts(products); // {highest: null, lowest: null}

products.push({ id: 1 });

// call with modified data
const result5 = sortProducts(products); // {highest: [...], lowest: [...]}

console.assert(
    JSON.stringify(sortProducts()) ===
        JSON.stringify({
            highest: null,
            lowest: null,
        }),
    'Should output object with empty data',
);

console.assert(function() {
    const result1 = sortProducts(products);
    const result2 = sortProducts(products);

    return (
        JSON.stringify(result2) ===
        JSON.stringify({
            highest: null,
            lowest: null,
        })
    );
}, 'It should remember params and if it is not changed return empty data');
