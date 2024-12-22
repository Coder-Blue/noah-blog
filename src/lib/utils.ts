import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type ResponseData = {
  category: string;
  title: string;
  slug: string;
}[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (
  ...args: Parameters<typeof fetch>
): Promise<ResponseData> => fetch(...args).then((res) => res.json());
