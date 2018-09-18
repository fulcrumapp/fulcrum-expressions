import APPLICATIONVERSION from '../APPLICATIONVERSION'
import { RESETCONFIG, CONFIG } from "../CONFIG"

beforeEach(RESETCONFIG);

test('fetches Fulcrum version off CONFIG', () => {
    CONFIG().applicationVersion = '1.0';
    expect(APPLICATIONVERSION()).toEqual('1.0');
});

test('falls back to empty string', () => {
    expect(APPLICATIONVERSION()).toEqual('');
});