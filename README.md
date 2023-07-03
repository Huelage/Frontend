# Huelage - Food Delivery App

Huelage is a cross-platform food delivery mobile application built with React Native and Expo. It allows users to browse and order food from various restaurants located within the university of Lagos, track orders in real-time, and have the meals delivered to their hostel. This README file provides an overview of the Huelage app, installation instructions, and key features.

## Key Features

- **User Registration and Authentication**: Users can sign up and log in to their accounts to access personalized features, such as order history and saved addresses.
- **Browse Restaurants and Menus**: Users can explore a wide range of restaurants, view their menus, and filter the options based on cuisine, price, or dietary preferences.
- **Place Orders**: Users can select desired food items, customize orders, add them to the cart, and proceed to checkout.
- **Real-time Order Tracking**: Users can track the status of their orders in real-time, from the time it is accepted by the restaurant to the delivery person's location.
- **Payment Integration**: The app supports secure payment options, allowing users to pay for their orders within the app using their preferred payment method.
- **Delivery Address Management**: Users can save multiple delivery addresses and select the desired address for each order.
- **Push Notifications**: Users receive push notifications to stay informed about order updates, promotions, and offers.
- **Ratings and Reviews**: Users can rate and provide reviews for restaurants and their delivered orders, helping others make informed decisions.

## Installation and Setup Instructions

To run the Huelage app locally, follow these steps:

- Clone the repository:

```
git clone https://github.com/Toby2507/Huelage-Frontend.git
```

- Install the dependencies:

```
npm install
```

- Start the development server:

```
npm start
```

- Install the Expo app on your mobile device from the App Store or Google Play Store.
- Scan the QR code displayed in the terminal or Expo Dev Tools using the Expo app.
- The Huelage app should now open on your device and be ready to use.

## Technologies Used

- React Native
- Expo
- React Navigation (navigation)
- Axios (HTTP requests)
- Push Notifications (Expo Notifications)

## Folder Structure

```
huelage-frontend
│── assets (images, icons, fonts)
├── src
│   │── components (reusable components)
│   │── containers (view components that aren't screens)
│   │── screens (main app screens)
│   └── utils (helper functions)
│── App.tsx (app entry point)
└── package.json (dependencies)
```

## Configuration

The app's configuration files are located in the src/config directory. Modify the necessary files to add your API keys, Firebase configurations, and other environment-specific settings.

## Contributors

- **Toby Salau**
- [**Daniel**]()

## License

The Huelage app is open-source software licensed under the MIT license.
