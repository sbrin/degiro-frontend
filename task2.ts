const products = [
    { id: 1, price: 10 },
    { id: 2, price: 11 },
    { id: 3, price: 1 },
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

console.assert(
    JSON.stringify(sortProducts()) ===
        JSON.stringify({
            highest: null,
            lowest: null,
        }),
    'Should output object with empty data',
);

console.assert(
    JSON.stringify(sortProducts(products), { size: 4 }) ===
        JSON.stringify({
            highest: null,
            lowest: null,
        }),
    'If size exceeds input length it should output object with empty data',
);

console.assert(
    JSON.stringify(sortProducts(products, { size: 3 })) ===
        JSON.stringify({
            highest: [
                { id: 2, price: 11 },
                { id: 1, price: 10 },
                { id: 3, price: 1 },
            ],
            lowest: null,
        }),
    'Highest first, otherwize lowest should be null',
);

console.assert(
    JSON.stringify(sortProducts(products, { size: 2 })) ===
        JSON.stringify({
            highest: [
                { id: 2, price: 11 },
                { id: 1, price: 10 },
            ],
            lowest: [{ id: 3, price: 1 }],
        }),
    'Should output two highest and last one should be lowest',
);

console.assert(
    JSON.stringify(sortProducts(products, { size: 1 })) ===
        JSON.stringify({
            highest: [{ id: 2, price: 11 }],
            lowest: [{ id: 3, price: 1 }],
        }),
    'Should output one highest and one lowest',
);

console.assert(
    JSON.stringify(sortProducts(products, { size: 0 })) ===
        JSON.stringify({
            highest: null,
            lowest: null,
        }),
    'If no results it should output empty data',
);
