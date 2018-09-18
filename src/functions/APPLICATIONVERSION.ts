import {CONFIG} from './CONFIG';

/** 
 * Returns Fulcrum version
 * @returns Fulcrum version
 */

export default function APPLICATIONVERSION () : string {
    return CONFIG().applicationVersion || ''
}