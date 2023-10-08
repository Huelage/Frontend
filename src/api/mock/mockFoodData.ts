import { UserFoodInterface } from '@interfaces';
import { Image } from 'react-native';

const food: UserFoodInterface[] = [
  {
    id: "1",
    name: "River prawn spicy soup",
    description: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/prawnImg.png')).uri,
    category: "Soups",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 1500,
    isFavourite: true
  },
  {
    id: "2",
    name: "Jollof Rice",
    description: "Jollof Rice eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/jollofRice.png')).uri,
    category: "Carbohydrate",
    availability: "AVAILABLE",
    pricingMethod: "PORTION",
    price: 150,
    isFavourite: true
  },
  {
    id: "3",
    name: "Macaroni",
    description: "Macaroni eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/macaroni.png')).uri,
    category: "Carbohydrate",
    availability: "AVAILABLE",
    pricingMethod: "PRICE",
    price: 300,
    isFavourite: true
  },
  {
    id: "4",
    name: "Chicken and Chips",
    description: "Chicken and Chips eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/chickenAndChips.png')).uri,
    category: "Snacks",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 8700,
    isFavourite: false
  },
  {
    id: "5",
    name: "Rice and Stew",
    description: "Rice and Stew eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/riceAndStew.png')).uri,
    category: "Carbohydrate",
    availability: "AVAILABLE",
    pricingMethod: "PORTION",
    price: 150,
    isFavourite: true
  },
  {
    id: "6",
    name: "Seafood Pasta",
    description: "Seafood Pasta eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/shrimpSpaghetti.png')).uri,
    category: "Carbohydrate",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 4800,
    isFavourite: true
  },
  {
    id: "7",
    name: "Chicken and Chips",
    description: "Chicken and Chips eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/chickenAndChips.png')).uri,
    category: "Snacks",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 4300,
    isFavourite: false
  },
  {
    id: "8",
    name: "River prawn spicy soap",
    description: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/prawnImg.png')).uri,
    category: "Soups",
    availability: "AVAILABLE",
    pricingMethod: "PACKAGE",
    packageSizes: [
      { name: "small", price: 1500 },
      { name: "medium", price: 2500 },
      { name: "large", price: 3500 },
    ],
    isFavourite: true
  },
  {
    id: "9",
    name: "Macaroni",
    description: "Macaroni eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/macaroni.png')).uri,
    category: "Carbohydrate",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 1700,
    isFavourite: false
  },
  {
    id: "10",
    name: "River prawn spicy soap",
    description: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/prawnImg.png')).uri,
    category: "Soups",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 3560,
    isFavourite: true
  }
];

export default food;