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
 * @interface Options
 */
export interface Options {
}

/**
 * Check if a given object implements the Options interface.
 */
export function instanceOfOptions(value: object): boolean {
    return true;
}

export function OptionsFromJSON(json: any): Options {
    return OptionsFromJSONTyped(json, false);
}

export function OptionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Options {
    return json;
}

export function OptionsToJSON(value?: Options | null): any {
    return value;
}
