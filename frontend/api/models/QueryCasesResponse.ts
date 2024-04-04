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
import type { Case } from './Case';
import {
    CaseFromJSON,
    CaseFromJSONTyped,
    CaseToJSON,
} from './Case';

/**
 * Pydantic model for query cases response.
 * @export
 * @interface QueryCasesResponse
 */
export interface QueryCasesResponse {
    /**
     * 
     * @type {Array<Case>}
     * @memberof QueryCasesResponse
     */
    cases: Array<Case>;
}

/**
 * Check if a given object implements the QueryCasesResponse interface.
 */
export function instanceOfQueryCasesResponse(value: object): boolean {
    if (!('cases' in value)) return false;
    return true;
}

export function QueryCasesResponseFromJSON(json: any): QueryCasesResponse {
    return QueryCasesResponseFromJSONTyped(json, false);
}

export function QueryCasesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): QueryCasesResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'cases': ((json['cases'] as Array<any>).map(CaseFromJSON)),
    };
}

export function QueryCasesResponseToJSON(value?: QueryCasesResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'cases': ((value['cases'] as Array<any>).map(CaseToJSON)),
    };
}
