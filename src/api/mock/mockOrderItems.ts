import { OrderInterface } from "@interfaces";

const orders: OrderInterface[] = [
  {
    id: "5",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-27T17:27:00.000Z",
    updatedAt: "2023-10-27T17:54:00.00Z",
    status: "EN_ROUTE",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "1",
        item_id: "1",
        quantity: 1,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      },
      {
        id: "3",
        item_id: "2",
        quantity: 1
      }
    ]
  },
  {
    id: "6",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-27T17:54:00.000Z",
    updatedAt: "2023-10-27T17:58:00.00Z",
    status: "PENDING",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "1",
        item_id: "1",
        quantity: 1,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      },
      {
        id: "2",
        item_id: "3",
        quantity: 2,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 }
        ]
      }
    ]
  },
  {
    id: "1",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-25T12:00:00.000Z",
    updatedAt: "2023-10-25T12:10:00.00Z",
    status: "READY",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "1",
        item_id: "1",
        quantity: 1,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      },
      {
        id: "2",
        item_id: "3",
        quantity: 2,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 }
        ]
      },
      {
        id: "3",
        item_id: "2",
        quantity: 1
      }
    ]
  },
  {
    id: "2",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-24T10:57:00.000Z",
    updatedAt: "2023-10-24T11:22:00.00Z",
    status: "COMPLETED",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "1",
        item_id: "1",
        quantity: 3,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      },
      {
        id: "3",
        item_id: "2",
        quantity: 1
      }
    ]
  },
  {
    id: "3",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-20T17:10:00.000Z",
    updatedAt: "2023-10-20T17:40:00.00Z",
    status: "COMPLETED",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "1",
        item_id: "1",
        quantity: 2,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      },
      {
        id: "2",
        item_id: "3",
        quantity: 4,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 }
        ]
      },
      {
        id: "3",
        item_id: "2",
        quantity: 1,
        extras: [
          { name: "Plantain", price: 100, quantity: 2 },
          { name: "Chicken", price: 1400, quantity: 1 }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Salado Cafeteria",
    deliveryAddress: "59 Akobi Crescent, Lagos, Nigeria",
    orderedAt: "2023-10-20T17:04:00.000Z",
    updatedAt: "2023-10-20T17:08:00.00Z",
    status: "CANCELLED",
    total: 2000,
    vendorAddress: "Education faculty, university of lagos, akoka, yaba",
    items: [
      {
        id: "4",
        item_id: "5",
        quantity: 4,
        extras: [
          { name: "Spaghetti", price: 100, quantity: 2 },
          { name: "Beans", price: 100, quantity: 1 },
          { name: "Coke", price: 200, quantity: 1 }
        ]
      }
    ]
  },
];

export default orders;