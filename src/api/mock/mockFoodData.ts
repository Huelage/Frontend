import { UserFoodInterface } from '@interfaces';
import { Image } from 'react-native';

const food: UserFoodInterface[] = [
  {
    id: "1",
    name: "River prawn spicy soup",
    description: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/prawnImg.png')).uri,
    category: "SOUPS",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 1500,
    isFavourite: true,
    preparationTime: "1 hour",
    sides: [
      {
        id: "1", description: "Please select a pack", options: [
          { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
          { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "2", description: "What would you like to add", options: [
          { groupId: "2", name: "Plantain", price: 200, isSingle: false },
          { groupId: "2", name: "Bread", price: 300, isSingle: false }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "2",
    name: "Jollof Rice",
    description: "Jollof Rice eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/jollofRice.png')).uri,
    category: "MAIN",
    availability: "AVAILABLE",
    pricingMethod: "PORTION",
    price: 150,
    isFavourite: true,
    sides: [
      {
        id: "1", description: "Please select a pack", options: [
          { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
          { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "2", description: "What would you like to add", options: [
          { groupId: "2", name: "Plantain", price: 200, isSingle: false },
          { groupId: "2", name: "Spaghetti", price: 150, isSingle: false },
          { groupId: "2", name: "Moi moi", price: 300, isSingle: false },
          { groupId: "2", name: "Beans", price: 100, isSingle: false }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "3",
    name: "Macaroni",
    description: "Macaroni eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/macaroni.png')).uri,
    category: "MAIN",
    availability: "AVAILABLE",
    pricingMethod: "PRICE",
    price: 300,
    isFavourite: true,
    sides: [
      {
        id: "1", description: "Please select a pack", options: [
          { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
          { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "2", description: "What would you like to add", options: [
          { groupId: "2", name: "Plantain", price: 200, isSingle: false },
          { groupId: "2", name: "Chicken Sauce", price: 1100, isSingle: false }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "4",
    name: "Chicken and Chips",
    description: "Chicken and Chips eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/chickenAndChips.png')).uri,
    category: "SNACKS",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 8700,
    isFavourite: false
  },
  {
    id: "5",
    name: "White Rice",
    description: "Rice and Stew eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/riceAndStew.png')).uri,
    category: "MAIN",
    availability: "AVAILABLE",
    pricingMethod: "PORTION",
    price: 150,
    isFavourite: true,
    sides: [
      {
        id: "1", description: "Please select a pack", options: [
          { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
          { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "2", description: "What soup do you want with it", options: [
          { groupId: "2", name: "Fried Stew", price: 0, isSingle: true },
          { groupId: "2", name: "Fish Stew", price: 0, isSingle: true },
          { groupId: "2", name: "Ofada stew", price: 0, isSingle: true }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "3", description: "What would you like to add", options: [
          { groupId: "3", name: "Plantain", price: 200, isSingle: false },
          { groupId: "3", name: "Spaghetti", price: 150, isSingle: false },
          { groupId: "3", name: "Moi moi", price: 300, isSingle: false },
          { groupId: "3", name: "Beans", price: 150, isSingle: false }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "6",
    name: "Seafood Pasta",
    description: "Seafood Pasta eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/shrimpSpaghetti.png')).uri,
    category: "MAIN",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 4800,
    isFavourite: true,
    preparationTime: "30 mins"
  },
  {
    id: "7",
    name: "Yamarita",
    description: "Yamarita eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/yamarita.png')).uri,
    category: "SNACKS",
    availability: "AVAILABLE",
    pricingMethod: "PACKAGE",
    packageSizes: [
      { name: "small", price: 1500 },
      { name: "medium", price: 2500 },
      { name: "large", price: 3500 },
    ],
    isFavourite: false
  },
  {
    id: "8",
    name: "Egusi Soup",
    description: "Egusi Soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/egusiSoup.png')).uri,
    category: "SOUPS",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 500,
    isFavourite: true,
    sides: [
      {
        id: "1", description: "Please select a pack", options: [
          { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
          { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
        ], isRequired: false, isMultiple: false
      },
      {
        id: "2", description: "Please select your preferred swallow", options: [
          { groupId: "2", name: "Eba", price: 200, isSingle: false },
          { groupId: "2", name: "Semolina", price: 200, isSingle: false },
          { groupId: "2", name: "Amala", price: 300, isSingle: false },
          { groupId: "2", name: "Wheat", price: 300, isSingle: false }
        ], isRequired: true, isMultiple: false
      },
      {
        id: "3", description: "What else would you like to add", options: [
          { groupId: "3", name: "Extra soup", price: 200, isSingle: true }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "9",
    name: "Suya Rice",
    description: "Macaroni eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/suyaRice.png')).uri,
    category: "MAIN",
    availability: "AVAILABLE",
    pricingMethod: "PACKAGE",
    packageSizes: [
      { name: "small", price: 1500 },
      { name: "medium", price: 2500 },
      { name: "large", price: 3500 }
    ],
    isFavourite: false,
    sides: [
      {
        id: "1", description: "What would you like to add", options: [
          { groupId: "1", name: "Chicken", price: 1400, isSingle: false },
          { groupId: "1", name: "Turkey", price: 1800, isSingle: false },
          { groupId: "1", name: "Plantain", price: 200, isSingle: false },
          { groupId: "1", name: "Moi moi", price: 250, isSingle: false }
        ], isRequired: false, isMultiple: true
      }
    ]
  },
  {
    id: "10",
    name: "Ponmo",
    description: "Ponmo eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/ponmo.png')).uri,
    category: "PROTEIN",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 300,
    isFavourite: true
  },
  {
    id: "11",
    name: "Catfish",
    description: "Catfish eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/catFish.png')).uri,
    category: "PROTEIN",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 1200,
    isFavourite: true
  },
  {
    id: "12",
    name: "Fried Chicken",
    description: "Fried Chicken eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: Image.resolveAssetSource(require('@images/friedChicken.png')).uri,
    category: "PROTEIN",
    availability: "AVAILABLE",
    pricingMethod: "FIXED",
    price: 1100,
    isFavourite: true
  }
];

export default food;