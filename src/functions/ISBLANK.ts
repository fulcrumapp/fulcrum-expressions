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

interface isBlankValue {
  choice_values?: any[]|null;
  other_values?: any[]|null;
}

/**
 * Returns a boolean value indiciating whether the object is blank/empty.
 * Values of null, undefined, and NaN are considered blank so that the function will return true
 * 
 * @param value item to be checked for blankness or emptiness; 
 * If an object is passed in, allowable keys are 'choice_values' and 'other_values',
 * allowable values are null or an array of values.
 * Example: ISBLANK( { choice_values: null, other_values: ['a', 'b'] } )
 * @returns boolean value
 * 
 * @example
 * ISBLANK('') // returns true
 * ISBLANK(NaN) // returns true
 * ISBLANK({choice_values: ['a'], other_values: null}) // returns false 
 */

export default function ISBLANK(value: any): boolean
export default function ISBLANK(value: isBlankValue): boolean
export default function ISBLANK(): boolean
export default function ISBLANK(value?: any): boolean {
  // checking for a singular, non-object value
  if (isNaN(value) || isUndefined(value) || isNull(value)) return true;
  if (isBoolean(value) || isNumber(value) || isDate(value) || isRegExp(value)) return false;
  if (isString(value)) return isEmpty('');
  if (isArray(value)) return value.length === 0;

  // checking for value as an object, assuming the appropriate keys
  // used to be value && ...
  if (value.choice_values || 
      value.choice_values === null || 
      value.other_values || 
      value.other_values === null){
        const choice: any[]|null|undefined = value.choice_values;
        const others: any[]|null|undefined = value.other_values;

        const hasChoice: boolean = isArray(choice) && choice.length > 0;
        const hasOthers: boolean = isArray(others) && others.length > 0;
        //const hasEither: boolean = hasChoice || hasOthers;
        
        //return hasEither;
        return hasChoice || hasOthers;
      }
  return Object.keys(value).length > 0;
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