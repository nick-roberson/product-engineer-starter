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
 * @interface IsMet
 */
export interface IsMet {
}

/**
 * Check if a given object implements the IsMet interface.
 */
export function instanceOfIsMet(value: object): boolean {
    return true;
}

export function IsMetFromJSON(json: any): IsMet {
    return IsMetFromJSONTyped(json, false);
}

export function IsMetFromJSONTyped(json: any, ignoreDiscriminator: boolean): IsMet {
    return json;
}

export function IsMetToJSON(value?: IsMet | null): any {
    return value;
}

