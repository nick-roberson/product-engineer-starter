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
 * Pydantic model for a logic in a step in a case record.
 * @export
 * @interface LogicItem
 */
export interface LogicItem {
    /**
     * 
     * @type {string}
     * @memberof LogicItem
     */
    text: string;
    /**
     * 
     * @type {boolean}
     * @memberof LogicItem
     */
    selected: boolean;
}

/**
 * Check if a given object implements the LogicItem interface.
 */
export function instanceOfLogicItem(value: object): boolean {
    if (!('text' in value)) return false;
    if (!('selected' in value)) return false;
    return true;
}

export function LogicItemFromJSON(json: any): LogicItem {
    return LogicItemFromJSONTyped(json, false);
}

export function LogicItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogicItem {
    if (json == null) {
        return json;
    }
    return {
        
        'text': json['text'],
        'selected': json['selected'],
    };
}

export function LogicItemToJSON(value?: LogicItem | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'text': value['text'],
        'selected': value['selected'],
    };
}
