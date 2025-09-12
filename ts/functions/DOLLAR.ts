/**
 * Format a number as currency using the DOLLAR function
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/dollar/
 */

import NUM from "./NUM";
import ISNAN from "./ISNAN";
import CURRENCYCODE from "./CURRENCYCODE";
import LANGUAGE from "./LANGUAGE";
import FORMATNUMBER from "./FORMATNUMBER";

const NO_VALUE = null; // Local definition

export default function DOLLAR(
  value: any, 
  decimals: number = 2, 
  currency?: string, 
  language?: string
): string | null {
  const dec = NUM(decimals);
  const finalDecimals = ISNAN(dec) ? 2 : dec;
  
  const numValue = NUM(value);
  
  if (!Number.isFinite(numValue)) {
    return NO_VALUE;
  }
  
  const finalCurrency = currency || CURRENCYCODE();
  const finalLanguage = language || LANGUAGE();
  
  const options = {
    style: 'currency',
    currency: finalCurrency,
    minimumFractionDigits: finalDecimals,
    maximumFractionDigits: finalDecimals
  };
  
  return FORMATNUMBER(numValue, finalLanguage, options);
}