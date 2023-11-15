export enum fonts {
  I_200 = "Inter_200ExtraLight",
  I_200I = "InterTight_200ExtraLight_Italic",
  I_300 = "Inter_300Light",
  I_300I = "InterTight_300Light_Italic",
  I_400 = "Inter_400Regular",
  I_400I = "InterTight_400Regular_Italic",
  I_500 = "Inter_500Medium",
  I_500I = "InterTight_500Medium_Italic",
  I_600 = "Inter_600SemiBold",
  I_600I = "InterTight_600SemiBold_Italic",
  I_700 = "Inter_700Bold",
  I_700I = "InterTight_700Bold_Italic"
}

export enum orderStatInfo {
  "PENDING" = "Your order is being processed",
  "PREPARING" = "Your order is being prepared",
  "READY" = "Your order is ready for pickup",
  "EN_ROUTE" = "Your order is on the way",
  "DELIVERED" = "Your order is here",
  "COMPLETED" = "Your order has been completed",
  "CANCELLED" = "Your order has been cancelled"
}

export enum orderStatRank {
  "PENDING",
  "PREPARING",
  "READY",
  "EN_ROUTE",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED"
}

export const categories = [
  { key: "1", value: "MAIN" },
  { key: "2", value: "PROTEIN" },
  { key: "3", value: "SOUPS" },
  { key: "4", value: "SNACKS" },
  { key: "5", value: "DRINKS" }
];

export const pricingMethods = [
  { key: "1", value: "PRICE" },
  { key: "2", value: "PORTION" },
  { key: "3", value: "FIXED" },
  { key: "4", value: "PACKAGE" }
];

export const foodCategories = ["ALL", ...categories.map((c) => c.value)];
