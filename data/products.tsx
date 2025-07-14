import { ProductItemProps } from "@/types/Product/ProductItemProps";

export const testProducts: ProductItemProps[] = [
  {
    id: "1",
    name: "Wireless Keyboard",
    price: 49.99,
    description: "A sleek wireless keyboard with quiet keys and long battery life.",
    autor: "TechGear",
    images: [
      "https://example.com/images/keyboard1.jpg",
      "https://example.com/images/keyboard2.jpg"
    ],
    category: "Electronics",
    subCategory: "Computer Accessories",
    stock: 120,
    usedType: "new",
    options: [
      { optionName: "Color", optionValue: ["Black", "White"] },
      { optionName: "Layout", optionValue: ["US", "UK"] }
    ]
  },
  {
    id: "2",
    name: "Mountain Bike Helmet",
    price: 89.99,
    description: "Durable and comfortable helmet suitable for all terrains.",
    autor: "SafeRide",
    images: [
      "https://example.com/images/helmet1.jpg"
    ],
    category: "Sports",
    subCategory: "Cycling",
    stock: 45,
    usedType: "new",
    options: [
      { optionName: "Size", optionValue: ["M", "L", "XL"] },
      { optionName: "Color", optionValue: ["Red", "Blue", "Green"] }
    ]
  },
  {
    id: "3",
    name: "Used MacBook Pro 2019",
    price: 999.99,
    description: "Gently used MacBook Pro with Retina Display and Touch Bar.",
    autor: "AppleReseller",
    images: [
      "https://example.com/images/macbook1.jpg"
    ],
    category: "Computers",
    subCategory: "Laptops",
    stock: 5,
    usedType: "used"
    // no options, and that's okay since it's optional
  },
  {
    id: "4",
    name: "E-Book: Learn JavaScript",
    price: 19.99,
    description: "Comprehensive guide to modern JavaScript with real-world examples.",
    autor: "CodeMaster",
    images: [
      "https://example.com/images/jsbook.jpg"
    ],
    category: "Books",
    subCategory: "Programming",
    stock: 999,
    usedType: "digital"
  }
];