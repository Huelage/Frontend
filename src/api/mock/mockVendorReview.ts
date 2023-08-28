import { Image } from 'react-native';

const reviews = [
	{
		id: 1,
		name: "Ella Mia",
		avatar: Image.resolveAssetSource(require('@images/beejay_dp.png')).uri,
		rating: 5,
		date: "15/02/23",
		message: "The food from this restaurant is amazing. I would definitely order again."
	},
	{
		id: 2,
		name: "Luna Eva",
		avatar: "",
		rating: 4,
		date: "07/03/23",
		message: "The have the spiciest jollof rice I have ever tasted and the barbecued chicken is to die for. I love it."
	},
	{
		id: 3,
		name: "Tosin Ola",
		avatar: "",
		rating: 3,
		date: "15/04/23",
		message: "The food is great but the delivery time is too long. I had to wait for 1 hours before my food arrived."
	}
];

export default reviews;