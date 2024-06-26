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
import type { IsComplete } from './IsComplete';
import {
    IsCompleteFromJSON,
    IsCompleteFromJSONTyped,
    IsCompleteToJSON,
} from './IsComplete';
import type { IsMet } from './IsMet';
import {
    IsMetFromJSON,
    IsMetFromJSONTyped,
    IsMetToJSON,
} from './IsMet';
import type { Limit } from './Limit';
import {
    LimitFromJSON,
    LimitFromJSONTyped,
    LimitToJSON,
} from './Limit';
import type { ProcedureName } from './ProcedureName';
import {
    ProcedureNameFromJSON,
    ProcedureNameFromJSONTyped,
    ProcedureNameToJSON,
} from './ProcedureName';
import type { Status } from './Status';
import {
    StatusFromJSON,
    StatusFromJSONTyped,
    StatusToJSON,
} from './Status';

/**
 * Pydantic model for query cases request.
 * @export
 * @interface QueryCasesRequest
 */
export interface QueryCasesRequest {
    /**
     * 
     * @type {number}
     * @memberof QueryCasesRequest
     */
    dEFAULTLIMIT?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof QueryCasesRequest
     */
    caseIds?: Array<string>;
    /**
     * 
     * @type {Status}
     * @memberof QueryCasesRequest
     */
    status?: Status;
    /**
     * 
     * @type {ProcedureName}
     * @memberof QueryCasesRequest
     */
    procedureName?: ProcedureName;
    /**
     * 
     * @type {IsMet}
     * @memberof QueryCasesRequest
     */
    isMet?: IsMet;
    /**
     * 
     * @type {IsComplete}
     * @memberof QueryCasesRequest
     */
    isComplete?: IsComplete;
    /**
     * 
     * @type {Limit}
     * @memberof QueryCasesRequest
     */
    limit?: Limit;
}

/**
 * Check if a given object implements the QueryCasesRequest interface.
 */
export function instanceOfQueryCasesRequest(value: object): boolean {
    return true;
}

export function QueryCasesRequestFromJSON(json: any): QueryCasesRequest {
    return QueryCasesRequestFromJSONTyped(json, false);
}

export function QueryCasesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): QueryCasesRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'dEFAULTLIMIT': json['DEFAULT_LIMIT'] == null ? undefined : json['DEFAULT_LIMIT'],
        'caseIds': json['case_ids'] == null ? undefined : json['case_ids'],
        'status': json['status'] == null ? undefined : StatusFromJSON(json['status']),
        'procedureName': json['procedure_name'] == null ? undefined : ProcedureNameFromJSON(json['procedure_name']),
        'isMet': json['is_met'] == null ? undefined : IsMetFromJSON(json['is_met']),
        'isComplete': json['is_complete'] == null ? undefined : IsCompleteFromJSON(json['is_complete']),
        'limit': json['limit'] == null ? undefined : LimitFromJSON(json['limit']),
    };
}

export function QueryCasesRequestToJSON(value?: QueryCasesRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'DEFAULT_LIMIT': value['dEFAULTLIMIT'],
        'case_ids': value['caseIds'],
        'status': StatusToJSON(value['status']),
        'procedure_name': ProcedureNameToJSON(value['procedureName']),
        'is_met': IsMetToJSON(value['isMet']),
        'is_complete': IsCompleteToJSON(value['isComplete']),
        'limit': LimitToJSON(value['limit']),
    };
}

