const products = [
    { id: 1, price: 10 },
    { id: 2, price: 11 },
    { id: 3, price: 1 },
    {
        id: 4,
        price: 3,
    },
    { id: 5, price: 1 },
    { id: 6, price: 8 },
    { id: 7, price: 3 },
    { id: 8, price: 0 },
    { id: 9, price: 4 },
    {
        id: 10,
        price: 5,
    },
    { id: 11, price: 9 },
    { id: 12, price: 13 },
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

    if (options && options.size) {
        size = options.size;
    }

    for (let i = 0; i < length; i++) {
        if (i < size) {
            lowest.push(sorted[i]);
        }
        if (i >= length - size) {
            highest.push(sorted[i]);
        }
    }
    return { highest, lowest };
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
    JSON.stringify(sortProducts(products)) ===
        JSON.stringify({
            highest: [
                { id: 6, price: 8 },
                { id: 11, price: 9 },
                { id: 1, price: 10 },
                { id: 2, price: 11 },
                { id: 12, price: 13 },
            ],
            lowest: [
                { id: 8, price: 0 },
                { id: 3, price: 1 },
                { id: 5, price: 1 },
                { id: 4, price: 3 },
                { id: 7, price: 3 },
            ],
        }),
    'Should output object with 5 highest and 5 lowest price products',
);
