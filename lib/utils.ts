import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:1337";

export function formatDateFromString(dateString: any) {
  // Split the input string into an array of year, month, and day
  const [year, month, day] = dateString.split("-");
  // Convert month to a number and subtract 1 since months in JavaScript are zero-indexed
  const jsDate = new Date(Number(year), Number(month) - 1, Number(day));

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name
  const monthName = monthNames[jsDate.getMonth()];

  // Get the day of the month
  const formattedDay = jsDate.getDate();

  // Get the year
  const formattedYear = jsDate.getFullYear();

  // Construct the final formatted date string
  const formattedDate = `${monthName} ${formattedDay}, ${formattedYear}`;

  return formattedDate;
}
