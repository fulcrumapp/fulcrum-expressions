import APPLICATIONBUILD from '../APPLICATIONBUILD'
import { RESETCONFIG, CONFIG } from "../CONFIG"

beforeEach(RESETCONFIG)

test('fetches application name off CONFIG', () => {
    CONFIG().applicationBuild = 'Webkit'
    expect(APPLICATIONBUILD()).toEqual('Webkit')
})

test('falls back to empty string', () => {
    expect(APPLICATIONBUILD()).toEqual('')
})