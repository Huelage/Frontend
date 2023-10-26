import { OrderInterface } from "@interfaces";

const orders: OrderInterface[] = [
  {
    id: "1",
    name: "Salado Cafeteria",
    orderedAt: "2023-10-25T12:00:00.000Z",
    updatedAt: "2023-10-25T12:10:00.00Z",
    status: "EN_ROUTE",
    total: 2000,
    items: []
  },
  {
    id: "2",
    name: "Salado Cafeteria",
    orderedAt: "2023-10-24T10:57:00.000Z",
    updatedAt: "2023-10-24T11:22:00.00Z",
    status: "COMPLETED",
    total: 2000,
    items: []
  },
  {
    id: "3",
    name: "Salado Cafeteria",
    orderedAt: "2023-10-20T17:10:00.000Z",
    updatedAt: "2023-10-20T17:40:00.00Z",
    status: "COMPLETED",
    total: 2000,
    items: []
  },
  {
    id: "4",
    name: "Salado Cafeteria",
    orderedAt: "2023-10-20T17:04:00.000Z",
    updatedAt: "2023-10-20T17:08:00.00Z",
    status: "CANCELLED",
    total: 2000,
    items: []
  },
];

export default orders;