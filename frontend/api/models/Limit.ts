/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Limit
 */
export interface Limit {
}

/**
 * Check if a given object implements the Limit interface.
 */
export function instanceOfLimit(value: object): boolean {
    return true;
}

export function LimitFromJSON(json: any): Limit {
    return LimitFromJSONTyped(json, false);
}

export function LimitFromJSONTyped(json: any, ignoreDiscriminator: boolean): Limit {
    return json;
}

export function LimitToJSON(value?: Limit | null): any {
    return value;
}

