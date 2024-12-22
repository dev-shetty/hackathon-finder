import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes span tags from currency HTML and returns the clean currency string
 *
 * @param {string} htmlString - HTML string containing currency span tags
 * @returns {string} Clean currency string with currency symbol
 * @throws {Error} If input is not a string or doesn't match expected format
 *
 * Example:
 * Input: '$<span data-currency-value>10,000</span>'
 * Output: '$10,000'
 */
export function cleanCurrencySpan(htmlString: string) {
  // Input validation
  if (typeof htmlString !== "string") {
    return htmlString
  }

  // Extract currency symbol and value using regex
  const match = htmlString.match(/^([^\s<]+)\s*<span[^>]*>([^<]+)<\/span>$/)

  if (!match) {
    return htmlString
  }

  const [, currencySymbol, value] = match
  return `${currencySymbol}${value}`
}

export function formatImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("//")) {
    return `https:${imageUrl}`
  }

  return imageUrl
}
