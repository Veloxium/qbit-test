type IFruit = {
    fruitId: number;
    fruitName: string;
    fruitType: "IMPORT" | "LOCAL";
    stock: number;
};

const fruits: IFruit[] = [
    {
        fruitId: 1,
        fruitName: 'Apel',
        fruitType: 'IMPORT',
        stock: 10
    },
    {
        fruitId: 2,
        fruitName: 'Kurma',
        fruitType: 'IMPORT',
        stock: 20
    },
    {
        fruitId: 3,
        fruitName: 'apel',
        fruitType: 'IMPORT',
        stock: 50
    },
    {
        fruitId: 4,
        fruitName: 'Manggis',
        fruitType: 'LOCAL',
        stock: 100
    },
    {
        fruitId: 5,
        fruitName: 'Jeruk Bali',
        fruitType: 'LOCAL',
        stock: 10
    },
    {
        fruitId: 5,
        fruitName: 'KURMA',
        fruitType: 'IMPORT',
        stock: 20
    },
    {
        fruitId: 5,
        fruitName: 'Salak',
        fruitType: 'LOCAL',
        stock: 150
    }
]


const fruitNames = Array.from(
    new Set(fruits.map(fruit => fruit.fruitName.toLowerCase()))
);


const groupedByType = fruits.reduce<Record<string, Set<string>>>((acc, fruit) => {
    const type = fruit.fruitType;
    if (!acc[type]) acc[type] = new Set();
    acc[type].add(fruit.fruitName.toLowerCase());
    return acc;
}, {});

const wadahCount = Object.keys(groupedByType).length;
const wadahContents = Object.fromEntries(
    Object.entries(groupedByType).map(([type, names]) => [type, Array.from(names)])
);


const stockPerWadah = fruits.reduce<Record<string, number>>((acc, fruit) => {
    const type = fruit.fruitType;
    acc[type] = (acc[type] || 0) + fruit.stock;
    return acc;
}, {});


console.log("1. Buah yang dimiliki Andi:", fruitNames);
console.log("2. Jumlah wadah:", wadahCount);
console.log("  Isi masing-masing wadah:", wadahContents);
console.log("3. Total stock per wadah:", stockPerWadah);
console.log("4. Ada duplikasi fruitId dan Nama buah tidak konsisten.");
