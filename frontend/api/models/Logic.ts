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
 * @interface Logic
 */
export interface Logic {
}

/**
 * Check if a given object implements the Logic interface.
 */
export function instanceOfLogic(value: object): boolean {
    return true;
}

export function LogicFromJSON(json: any): Logic {
    return LogicFromJSONTyped(json, false);
}

export function LogicFromJSONTyped(json: any, ignoreDiscriminator: boolean): Logic {
    return json;
}

export function LogicToJSON(value?: Logic | null): any {
    return value;
}

