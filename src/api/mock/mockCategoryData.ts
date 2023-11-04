import { Image } from "react-native";

const data = [
  {
    id: "1",
    name: "River prawn spicy soap",
    price: 1000,
    imgUrl: Image.resolveAssetSource(require("@images/prawnImg.png")).uri,
    rating: 4.6
  },
  {
    id: "2",
    name: "Jollof Rice",
    price: 2000,
    imgUrl: Image.resolveAssetSource(require("@images/jollofRice.png")).uri,
    rating: 5,
  },
  {
    id: "3",
    name: "Macaroni",
    price: 4300,
    imgUrl: Image.resolveAssetSource(require("@images/macaroni.png")).uri,
    rating: 4.2,
  },
  {
    id: "4",
    name: "Chicken and Chips",
    price: 8700,
    imgUrl: Image.resolveAssetSource(require("@images/chickenAndChips.png")).uri,
    rating: 3.9,
  },
  {
    id: "5",
    name: "Rice and Stew",
    price: 1200,
    imgUrl: Image.resolveAssetSource(require("@images/riceAndStew.png")).uri,
    rating: 4.9,
  },
  {
    id: "6",
    name: "Seafood Pasta",
    price: 10800,
    imgUrl: Image.resolveAssetSource(require("@images/shrimpSpaghetti.png")).uri,
    rating: 4.1,
  },
  {
    id: "7",
    name: "Chicken and Chips",
    price: 4300,
    imgUrl: Image.resolveAssetSource(require("@images/chickenAndChips.png")).uri,
    rating: 3.6,
  },
  {
    id: "8",
    name: "River prawn spicy soap",
    price: 12340,
    imgUrl: Image.resolveAssetSource(require("@images/prawnImg.png")).uri,
    rating: 3.8,
  },
  {
    id: "9",
    name: "Macaroni",
    price: 1700,
    imgUrl: Image.resolveAssetSource(require("@images/macaroni.png")).uri,
    rating: 4.3,
  },
  {
    id: "10",
    name: "River prawn spicy soap",
    price: 3560,
    imgUrl: Image.resolveAssetSource(require("@images/prawnImg.png")).uri,
    rating: 4.7,
  }
];

export default data;