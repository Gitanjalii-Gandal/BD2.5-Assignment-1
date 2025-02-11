const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Sample Product Array (Make sure we have a product with ROM = 64)
let products = [
  { id: 1, name: "iPhone 13", brand: "Apple", ram: 8, rom: 128, os: "iOS", price: 75000, rating: 4.8 },
  { id: 2, name: "Samsung Galaxy S21", brand: "Samsung", ram: 8, rom: 256, os: "Android", price: 60000, rating: 4.5 },
  { id: 3, name: "OnePlus 9", brand: "OnePlus", ram: 12, rom: 256, os: "Android", price: 45000, rating: 4.6 },
  { id: 4, name: "Redmi Note 11", brand: "Xiaomi", ram: 6, rom: 128, os: "Android", price: 20000, rating: 4.2 },
  { id: 5, name: "Google Pixel 6", brand: "Google", ram: 8, rom: 128, os: "Android", price: 65000, rating: 4.7 },
  { id: 6, name: "Realme Narzo 50", brand: "Realme", ram: 4, rom: 64, os: "Android", price: 15000, rating: 4.0 } // ✅ Added a product with ROM = 64
];


// **Endpoint 1: Sort by Popularity (Rating High to Low)**
app.get("/products/sort/popularity", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
  res.json({ products: sortedProducts });
});

// **Endpoint 2: Sort by Price (High to Low)**
app.get("/products/sort/price-high-to-low", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => b.price - a.price);
  res.json({ products: sortedProducts });
});

// **Endpoint 3: Sort by Price (Low to High)**
app.get("/products/sort/price-low-to-high", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => a.price - b.price);
  res.json({ products: sortedProducts });
});

// **Endpoint 4: Filter by RAM**
app.get("/products/filter/ram", (req, res) => {
  let ramFilter = parseInt(req.query.ram);
  let filteredProducts = products.filter((p) => p.ram === ramFilter);
  res.json({ products: filteredProducts });
});


// Function to filter products by ROM
const filterByRom = (romSize) => {
  return products.filter((product) => product.rom === romSize);
};
// **Endpoint 5: Filter by ROM**
app.get("/products/filter/rom", (req, res) => {
  let romFilter = parseInt(req.query.rom);
  let filteredProducts = filterByRom(romFilter);

  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: `No products found with ROM = ${romFilter} GB.` });
  }
  res.json({ products: filteredProducts });
});

// **Endpoint 6: Filter by Brand**
app.get("/products/filter/brand", (req, res) => {
  let brandFilter = req.query.brand.toLowerCase();
  let filteredProducts = products.filter((p) => p.brand.toLowerCase() === brandFilter);
  res.json({ products: filteredProducts });
});

// **Endpoint 7: Filter by OS**
app.get("/products/filter/os", (req, res) => {
  let osFilter = req.query.os.toLowerCase();
  let filteredProducts = products.filter((p) => p.os.toLowerCase() === osFilter);
  res.json({ products: filteredProducts });
});


// **Endpoint 8: Filter by Price (Less than or Equal)**
app.get("/products/filter/price", (req, res) => {
  let maxPrice = parseInt(req.query.price);
  let filteredProducts = products.filter((p) => p.price <= maxPrice);
  res.json({ products: filteredProducts });
});



// **Endpoint 9: Get All Products (Original List)**
app.get("/products", (req, res) => {
  res.json({ products });
});


// **Start the server**
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
