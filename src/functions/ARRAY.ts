import FLATTEN from './FLATTEN';
import _ from 'underscore';

export default function ARRAY() : any[] {
  return FLATTEN(_.toArray(arguments));
}