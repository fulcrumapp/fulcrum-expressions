import APPLICATION from '../APPLICATION'
import { RESETCONFIG, CONFIG } from "../CONFIG"

beforeEach(RESETCONFIG)

test('fetches platform name off CONFIG', () => {
    CONFIG().application = 'Chrome'
    expect(APPLICATION()).toEqual('Chrome')
})

test('falls back to empty string', () => {
    expect(APPLICATION()).toEqual('')
})
