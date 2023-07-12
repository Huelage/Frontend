import { Image } from "react-native";

export default restuarants = [
  {
    id: 1,
    name: "Hard Rock Cafe",
    location: "Landmark village, water coporation road, Oniru, VI, Lagos",
    rating: 5,
    imgUrl: Image.resolveAssetSource(require('@images/addRockCafe.jpeg')).uri
  },
  {
    id: 2,
    name: "Shiro Restaurant",
    location: "Block XVI 3 & 4 Victoria Island Oniru Estate, Eti- Osa Lagos",
    rating: 4.7,
    imgUrl: Image.resolveAssetSource(require('@images/shiroRestaurant.png')).uri
  },
  {
    id: 3,
    name: "Ayo's Pizza",
    location: "Shop 10, jaja complex, unilag, akoka, Lagos",
    rating: 4,
    imgUrl: Image.resolveAssetSource(require('@images/ayoPizza.png')).uri
  },
  {
    id: 4,
    name: "Cafe Royal",
    location: "CCMQ+76H, Etim Iyanga Cres, Victoria Island Lagos",
    rating: 4.9,
    imgUrl: Image.resolveAssetSource(require('@images/cafeRoyal.png')).uri
  },
  {
    id: 5,
    name: "Favvy Eats",
    location: "Abule oja cres, akoka road off university of lagos",
    rating: 4.6,
    imgUrl: Image.resolveAssetSource(require('@images/favvyEats.png')).uri
  },
  {
    id: 6,
    name: "Iya Moria",
    location: "no 1 dli avenue, opposite honors female hostel, Unilag",
    rating: 5,
    imgUrl: Image.resolveAssetSource(require('@images/iyaMoria.png')).uri
  },
  {
    id: 7,
    name: "Papii's Maestro",
    location: "Landmark village, water coporation road, Oniru, VI, Lagos",
    rating: 4.1,
    imgUrl: Image.resolveAssetSource(require('@images/papiisMaestro.png')).uri
  },
  {
    id: 8,
    name: "Salado",
    location: "Education faculty, university of lagos, akoka, yaba",
    rating: 5,
    imgUrl: Image.resolveAssetSource(require('@images/salado.png')).uri
  },
];