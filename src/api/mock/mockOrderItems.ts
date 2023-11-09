import { OrderInterface } from "@interfaces";

const orders: OrderInterface[] = [
  {
    id: "5",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-27T17:27:00.000Z",
    updatedAt: "2023-10-27T17:54:00.00Z",
    estimatedDeliveryTime: "2023-10-27T18:14:00.00Z",
    status: "EN_ROUTE",
    subTotal: 3900,
    deliveryFee: 300,
    totalAmount: 4200,
    paymentBreakdown: [{ name: "CARD", amount: 4200 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "1",
        quantity: 1,
        totalPrice: 3900,
        extras: [
          { name: "Big Pack", price: 500 },
          { name: "Plantain", price: 200, quantity: 2 },
          { name: "Bread", price: 300, quantity: 1 }
        ]
      },
      {
        id: "3",
        vendorId: "8",
        item_id: "11",
        quantity: 1,
        totalPrice: 300,
      }
    ]
  },
  {
    id: "6",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-27T17:54:00.000Z",
    updatedAt: "2023-10-27T17:58:00.00Z",
    estimatedDeliveryTime: "2023-10-27T18:18:00.00Z",
    status: "PENDING",
    subTotal: 4500,
    deliveryFee: 400,
    totalAmount: 4900,
    paymentBreakdown: [{ name: "CARD", amount: 4900 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "1",
        quantity: 1,
        totalPrice: 3900,
        extras: [
          { name: "Big Pack", price: 500 },
          { name: "Plantain", price: 200, quantity: 2 },
          { name: "Bread", price: 300, quantity: 2 }
        ]
      },
      {
        id: "2",
        vendorId: "8",
        item_id: "12",
        quantity: 3,
        totalPrice: 600
      }
    ]
  },
  {
    id: "1",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-25T12:00:00.000Z",
    updatedAt: "2023-10-25T12:10:00.00Z",
    estimatedDeliveryTime: "2023-10-25T12:30:00.00Z",
    status: "READY",
    subTotal: 6900,
    deliveryFee: 400,
    totalAmount: 7300,
    paymentBreakdown: [{ name: "CARD", amount: 7300 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "9",
        quantity: 1,
        size: "large",
        totalPrice: 5500,
        extras: [
          { name: "Chicken", price: 1400, quantity: 2 },
          { name: "Plantain", price: 200, quantity: 3 }
        ]
      }
    ]
  },
  {
    id: "2",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-24T10:57:00.000Z",
    updatedAt: "2023-10-24T11:22:00.00Z",
    estimatedDeliveryTime: "2023-10-24T11:20:00.00Z",
    status: "COMPLETED",
    subTotal: 3900,
    deliveryFee: 400,
    totalAmount: 4300,
    paymentBreakdown: [{ name: "HUENIT", amount: 3900 }, { name: "CASH", amount: 400 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "8",
        quantity: 1,
        totalPrice: 3900,
        extras: [
          { name: "Big Pack", price: 500 },
          { name: "Amala", price: 300, quantity: 3 }
        ]
      },
      {
        id: "2",
        vendorId: "8",
        item_id: "10",
        quantity: 3,
        totalPrice: 500
      },
      {
        id: "3",
        vendorId: "8",
        item_id: "12",
        quantity: 1,
        totalPrice: 600
      }
    ]
  },
  {
    id: "3",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-20T17:10:00.000Z",
    updatedAt: "2023-10-20T17:40:00.00Z",
    estimatedDeliveryTime: "2023-10-20T17:45:00.00Z",
    status: "COMPLETED",
    subTotal: 5700,
    deliveryFee: 500,
    totalAmount: 6200,
    paymentBreakdown: [{ name: "HUENIT", amount: 6200 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "7",
        quantity: 1,
        size: "large",
        totalPrice: 5500
      },
      {
        id: "2",
        vendorId: "8",
        item_id: "12",
        quantity: 2,
        totalPrice: 700
      }
    ]
  },
  {
    id: "4",
    vendorName: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-20T17:04:00.000Z",
    updatedAt: "2023-10-20T17:08:00.00Z",
    estimatedDeliveryTime: "2023-10-20T17:28:00.00Z",
    status: "CANCELLED",
    subTotal: 17400,
    deliveryFee: 400,
    totalAmount: 17800,
    paymentBreakdown: [{ name: "HUENIT", amount: 17800 }],
    paymentStatus: true,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    orderItems: [
      {
        id: "1",
        vendorId: "8",
        item_id: "4",
        quantity: 2,
        totalPrice: 6000
      }
    ]
  },
];

export default orders;
