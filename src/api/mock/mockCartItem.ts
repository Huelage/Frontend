import { OrderItemInterface } from "@interfaces";

const data: OrderItemInterface[] = [
  {
    id: "1",
    item_id: "8",
    quantity: 1,
    extras: [
      { name: "Big Pack", price: 500 },
      { name: "Amala", price: 300, quantity: 3 }
    ]
  },
  {
    id: "2",
    item_id: "10",
    quantity: 3,
  },
  {
    id: "3",
    item_id: "12",
    quantity: 1,
  },
  {
    id: "4",
    item_id: "1",
    quantity: 1,
    extras: [
      { name: "Big Pack", price: 500 },
      { name: "Plantain", price: 200, quantity: 2 },
      { name: "Bread", price: 300, quantity: 1 }
    ]
  },
  {
    id: "5",
    item_id: "11",
    quantity: 1,
  }
];

export default data;
