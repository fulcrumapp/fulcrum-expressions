import { extendToBeWithinRange } from '../../test/helpers';
import RAND from '../RAND';

beforeEach(extendToBeWithinRange);

test('returns a random number between 0 and 1', () => {
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RAND()).toBeWithinRange(0, 1);
});
