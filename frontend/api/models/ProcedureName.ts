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
 * @interface ProcedureName
 */
export interface ProcedureName {
}

/**
 * Check if a given object implements the ProcedureName interface.
 */
export function instanceOfProcedureName(value: object): boolean {
    return true;
}

export function ProcedureNameFromJSON(json: any): ProcedureName {
    return ProcedureNameFromJSONTyped(json, false);
}

export function ProcedureNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProcedureName {
    return json;
}

export function ProcedureNameToJSON(value?: ProcedureName | null): any {
    return value;
}
