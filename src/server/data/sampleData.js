import { ObjectId } from 'mongodb';

// Create consistent ObjectIds for referencing
const shopIds = {
    techWorld: new ObjectId("64a7b1c4f1d2c3e4a567890a"),
    gadgetHub: new ObjectId("64a7b1c4f1d2c3e4a567890b"),
    electronixStore: new ObjectId("64a7b1c4f1d2c3e4a567890c"),
    computeCentral: new ObjectId("64a7b1c4f1d2c3e4a567890d")
};

const productIds = {
    rtx4080: new ObjectId("64a7b1c4f1d2c3e4a5678901"),
    rx7900xtx: new ObjectId("64a7b1c4f1d2c3e4a5678902"),
    rtx3070: new ObjectId("64a7b1c4f1d2c3e4a5678903"),
    rx6800: new ObjectId("64a7b1c4f1d2c3e4a5678904"),
    rtx3090ti: new ObjectId("64a7b1c4f1d2c3e4a5678905")
};

export const sampleProducts = [
    {
        _id: productIds.rtx4080,
        name: "NVIDIA GeForce RTX 4080",
        brand: "NVIDIA",
        model: "RTX 4080",
        price: 1199.99,
        specs: {
            memory: "16GB GDDR6X",
            coreClock: "2205 MHz",
            boostClock: "2505 MHz",
            cudaCores: 9728
        },
        inStock: true,
        shops: [shopIds.techWorld, shopIds.gadgetHub]
    },
    {
        _id: productIds.rx7900xtx,
        name: "AMD Radeon RX 7900 XTX",
        brand: "AMD",
        model: "RX 7900 XTX",
        price: 999.99,
        specs: {
            memory: "24GB GDDR6",
            coreClock: "2000 MHz",
            boostClock: "2300 MHz",
            cudaCores: null
        },
        inStock: true,
        shops: [shopIds.techWorld]
    },
    {
        _id: productIds.rtx3070,
        name: "NVIDIA GeForce RTX 3070",
        brand: "NVIDIA",
        model: "RTX 3070",
        price: 499.99,
        specs: {
            memory: "8GB GDDR6",
            coreClock: "1500 MHz",
            boostClock: "1725 MHz",
            cudaCores: 5888
        },
        inStock: false,
        shops: []
    },
    {
        _id: productIds.rx6800,
        name: "AMD Radeon RX 6800",
        brand: "AMD",
        model: "RX 6800",
        price: 579.99,
        specs: {
            memory: "16GB GDDR6",
            coreClock: "1700 MHz",
            boostClock: "2105 MHz",
            cudaCores: null
        },
        inStock: true,
        shops: [shopIds.gadgetHub, shopIds.electronixStore]
    },
    {
        _id: productIds.rtx3090ti,
        name: "NVIDIA GeForce RTX 3090 Ti",
        brand: "NVIDIA",
        model: "RTX 3090 Ti",
        price: 1499.99,
        specs: {
            memory: "24GB GDDR6X",
            coreClock: "1560 MHz",
            boostClock: "1860 MHz",
            cudaCores: 10496
        },
        inStock: false,
        shops: []
    }
];

export const sampleShops = [
    {
        _id: shopIds.techWorld,
        name: "Tech World",
        location: "123 Tech Street, Silicon Valley, CA",
        contact: "123-456-7890",
        products: [productIds.rtx4080, productIds.rx7900xtx]
    },
    {
        _id: shopIds.gadgetHub,
        name: "Gadget Hub",
        location: "456 Innovation Drive, Austin, TX",
        contact: "987-654-3210",
        products: [productIds.rtx4080, productIds.rx6800]
    },
    {
        _id: shopIds.electronixStore,
        name: "Electronix Store",
        location: "789 Future Blvd, New York, NY",
        contact: "555-123-4567",
        products: [productIds.rx6800]
    },
    {
        _id: shopIds.computeCentral,
        name: "Compute Central",
        location: "321 Binary Road, Seattle, WA",
        contact: "444-555-6666",
        products: []
    }
];