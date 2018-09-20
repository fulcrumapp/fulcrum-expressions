import { isFinite } from 'lodash';
import NUM from './NUM';

export default function ISNUMBER(value : any) : boolean {
  return isFinite(value);
}