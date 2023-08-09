import { Image } from "react-native";

const data = [
  {
    id: 1,
    name: "River prawn spicy soap",
    price: 2400,
    imgUrl: Image.resolveAssetSource(require("@images/prawnImg.png")).uri,
    quantity: 1,
  },
  {
    id: 2,
    name: "Jollof Rice",
    price: 2000,
    imgUrl: Image.resolveAssetSource(require("@images/jollofRice.png")).uri,
    quantity: 1,
  },
  {
    id: 3,
    name: "Macaroni",
    price: 4300,
    imgUrl: Image.resolveAssetSource(require("@images/macaroni.png")).uri,
    quantity: 1,
  },
];

export default data;
