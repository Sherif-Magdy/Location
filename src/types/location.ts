import { JsonApiObject } from './json-api';

export interface Country extends JsonApiObject {
    id: string;
    type: string;
    attributes: {
        name: string;
    };
}

export interface City extends JsonApiObject {
    id: string;
    type: string;
    attributes: {
        name: string;
    };
    relationships: {
        country: {
            data: {
                id: string;
                type: 'country';
            };
        };
    };
}
