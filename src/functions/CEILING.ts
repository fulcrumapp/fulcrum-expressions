import NUM from './NUM';
import ABS from './ABS';
import ISNAN from './ISNAN';
import PRECISION from './PRECISION';
import ROUND from './ROUND';


export default function CEILING(number: number | string, significance = 1) : number {
  const sig : number = ABS(significance);
  const num : number = NUM(number);
  const precision : number = PRECISION(sig);

  if (ISNAN(num)) return NaN;
  if (sig === 0) return 0;

  return ROUND(Math.ceil(num / sig) * sig, precision);
}