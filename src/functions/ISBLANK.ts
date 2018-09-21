import { isNaN, 
         isBoolean, 
         isNumber, 
         isDate, 
         isRegExp, 
         isString, 
         isEmpty,
         isUndefined,
         isNull,
         isArray 
        } from 'lodash';

import { FormFieldValues as ChoiceFieldValue} from '../values';

/**
 * Returns a boolean value indiciating whether the object is blank/empty.
 * Values of null, undefined, and NaN are considered blank and the function will return true.
 * 
 * @param value item or Choice Field value to be checked for blankness or emptiness;
 * Example: ISBLANK( { choice_values: null, other_values: ['a', 'b'] } )
 * @returns boolean value
 * 
 * @example
 * ISBLANK('') // returns true
 * ISBLANK(NaN) // returns true
 * ISBLANK({choice_values: ['a'], other_values: null}) // returns false 
 * ISBLANK({choice_values: null, other_values: null}) // returns true
 */

export default function ISBLANK(value: ChoiceFieldValue): boolean
export default function ISBLANK(value: any): boolean
export default function ISBLANK(): boolean
export default function ISBLANK(value?: any): boolean {
  // checking for a singular, non-object value
  if (isNaN(value) || isUndefined(value) || isNull(value)) return true;
  if (isBoolean(value) || isNumber(value) || isDate(value) || isRegExp(value)) return false;
  if (isString(value) || isArray(value)) return isEmpty(value);

  // checking for value as an object, assuming the appropriate keys
  if (value && (value.choice_values || 
                isNull(value.choice_values) || 
                value.other_values || 
                isNull(value.other_values))) {
                  const choice: any[]|null|undefined = value.choice_values;
                  const others: any[]|null|undefined = value.other_values;

                  const hasChoice: boolean = isArray(choice) && choice.length > 0;
                  const hasOthers: boolean = isArray(others) && others.length > 0;
                  
                  return !(hasChoice || hasOthers);
                }
  // return true if an empty object (no keys) is passed, otherwise false
  return Object.keys(value).length < 1;
}

//   return true unless value?
//   if value and (value.choice_values or
//                 value.choice_values is null or
//                 value.other_values or
//                 value.other_values is null)

//     choice = value.choice_values
//     others = value.other_values

//     hasChoice = _.isArray(choice) and choice.length > 0
//     hasOthers = _.isArray(others) and others.length > 0
//     hasEither = hasChoice or hasOthers

//     return not hasEither

//   Object.keys(value).length is 0