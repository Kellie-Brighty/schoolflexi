import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to combine class names
 * @param inputs - Class names to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
