import { DropDataInterface } from "@interfaces";
import { Image } from "react-native";

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

export const categories: DropDataInterface[] = [
  { value: "MAIN", imgUrl: Image.resolveAssetSource(require("@images/main_img.jpeg")).uri },
  { value: "PROTEIN", imgUrl: Image.resolveAssetSource(require("@images/protein_img.jpeg")).uri },
  { value: "SOUPS", imgUrl: Image.resolveAssetSource(require("@images/soups_img.webp")).uri },
  { value: "SNACKS", imgUrl: Image.resolveAssetSource(require("@images/snacks_img.webp")).uri },
  { value: "DRINKS", imgUrl: Image.resolveAssetSource(require("@images/drinks_img.png")).uri }
];

export const pricingMethods: DropDataInterface[] = [
  { value: "PRICE", desc: "Customers set their preferred price within your range.", imgUrl: Image.resolveAssetSource(require("@images/price_img.png")).uri },
  { value: "PORTION", desc: "Sell by portion; set prices for flexibility.", imgUrl: Image.resolveAssetSource(require("@images/portion_img.png")).uri },
  { value: "FIXED", desc: "Maintain consistency with a set, unalterable price.", imgUrl: Image.resolveAssetSource(require("@images/fixed_img.png")).uri },
  { value: "PACKAGE", desc: "Offer meal options with various sizes and prices.", imgUrl: Image.resolveAssetSource(require("@images/package_img.png")).uri },
];

export const foodCategories = ["ALL", ...categories.map((c) => c.value)];
