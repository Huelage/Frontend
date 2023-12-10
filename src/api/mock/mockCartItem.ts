const data = [
  {
    id: "123",
    vendorId: "123",
    item_id: "1",
    item_name: "River stew",
    quantity: 1,
    totalPrice: 3900,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 },
      { groupId: "2", name: "Plantain", price: 200, quantity: 3 }
    ]
  },
  {
    id: "234",
    vendorId: "234",
    item_id: "2",
    item_name: "Yamarita",
    portion: 2,
    quantity: 3,
    totalPrice: 500,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 }
    ]
  },
  {
    id: "345",
    vendorId: "345",
    item_id: "3",
    item_name: "Macaroni",
    price: 500,
    quantity: 1,
    totalPrice: 600,
    extras: [
      { groupId: "1", name: "Big Pack", price: 500 }
    ]
  },
  {
    id: "456",
    vendorId: "234",
    item_id: "4",
    item_name: "Chicken and chips",
    size: "large",
    quantity: 1,
    totalPrice: 1000
  }
];

export default data;
