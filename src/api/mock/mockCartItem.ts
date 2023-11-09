const data = [
  {
    id: "1",
    vendorId: "1",
    item_id: "1",
    quantity: 1,
    totalPrice: 3900,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 },
      { groupId: "2", name: "Plantain", price: 200, quantity: 3 }
    ]
  },
  {
    id: "2",
    vendorId: "1",
    item_id: "2",
    portion: 2,
    quantity: 3,
    totalPrice: 500,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 }
    ]
  },
  {
    id: "3",
    vendorId: "1",
    item_id: "3",
    price: 500,
    quantity: 1,
    totalPrice: 600,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 }
    ]
  },
  {
    id: "4",
    vendorId: "1",
    item_id: "9",
    size: "large",
    quantity: 1,
    totalPrice: 1000
  },
  {
    id: "5",
    vendorId: "2",
    item_id: "10",
    quantity: 3,
    totalPrice: 300,
  }
];

export default data;
