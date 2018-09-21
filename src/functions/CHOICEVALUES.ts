import ISBLANK from './ISBLANK';
import { isUndefined, compact, concat } from 'lodash';
import { FormFieldValues as ChoiceFieldValue} from '../values';

/**
 * Converts a choicefield object to an array with null values and blank strings removed
 * @param field ChoiceFieldValue: {choice_values: [ ... ], other_values: [ ... ]}
 * @returns array
 * 
 * @example
 * CHOICEVALUES({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns [ 'a', 'b', 'c', 'd' ]
 */
export default function CHOICEVALUES(field: ChoiceFieldValue): string[]
export default function CHOICEVALUES(field: any): any[]
export default function CHOICEVALUES(): undefined
export default function CHOICEVALUES(field?: any): any[]|undefined {
  if(isUndefined(field)) return undefined;
  if (ISBLANK(field)) return [];

  const values: any[] = concat(field.choice_values, field.other_values);

  return compact(values)
}