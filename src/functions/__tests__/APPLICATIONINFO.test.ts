import { RESETCONFIG, CONFIG } from "../CONFIG"
import APPLICATIONINFO from '../APPLICATIONINFO';

beforeEach(RESETCONFIG)

test('fetches name of application engine, application platform, and application version from CONFIG', () =>{
    CONFIG().application = 'Chrome';
    CONFIG().applicationVersion = '4.2.3.5.2';
    CONFIG().applicationBuild = 'Webkit';

    expect(APPLICATIONINFO()).toEqual('Chrome, 4.2.3.5.2, Webkit');
});

test('falls back to an empty string', () => {
    expect(APPLICATIONINFO()).toEqual("");
});