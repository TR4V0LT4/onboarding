import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "@/types/types"
import { products } from "@/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateReference = (date: Date, counter: number) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const counterStr = counter.toString().padStart(4, '0');
  return `V${year}${month}${day}-${counterStr}`;
};

export const calculateTotalAmount = (cart: Product[]) => {
  return cart.reduce((total, item) => total + (item.quantity ?? 0) * (item.selected_ppv ?? 0), 0);
};

export const calculatePPVR = (product: Product) => {
  if (product.type_remise === '1') {
      return (product.selected_ppv ?? 0) - ((product.selected_ppv ?? 0) * (product.remise ?? 0) / 100);
  } else if (product.type_remise === '0') {
      return (product.selected_ppv ?? 0) - (product.remise ?? 0);
  }
  return product.selected_ppv;
};

export const calculateTotalHT = (product: Product) => {
  const ppvr = calculatePPVR(product) ?? 0;
  return (product.quantity ?? 0) * ppvr;
};

export const calculateTotalTTC = (product: Product) => {
  const totalHT = calculateTotalHT(product);
  return totalHT + (totalHT * (product.tva ?? 0) / 100);
}

export const calculateCartTotal = (cart: Product[]) => {
  return cart.reduce((total, item) => total + calculateTotalTTC(item), 0);
}

