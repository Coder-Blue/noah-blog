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

export function fetcherUrl(locale: string): string {
  if (process.env.NODE_ENV === "development")
    return `http://localhost:3000/${locale}/blog/api`;

  return `${process.env.NEXT_PUBLIC_URL}/${locale}/blog/api`;
}

export function baseUrl(locale: string): string {
  if (process.env.NODE_ENV === "development")
    return `http://localhost:3000/${locale}`;

  return `${process.env.NEXT_PUBLIC_URL}/${locale}`;
}

export const fetcher = (
  ...args: Parameters<typeof fetch>
): Promise<ResponseData> => fetch(...args).then((res) => res.json());
