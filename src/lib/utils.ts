import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/api`
    : `${process.env.NEXT_PUBLIC_URL}/api`;
