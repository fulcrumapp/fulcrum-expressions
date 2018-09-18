import {CONFIG} from './CONFIG';

/** 
 * Returns application version
 * @returns application version
 */

export default function APPLICATIONVERSION () : string {
    return CONFIG().applicationVersion || ''
}