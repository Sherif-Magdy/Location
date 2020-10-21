import { JsonApiObject } from './json-api';

export interface Country extends JsonApiObject {
    id: string;
    type: 'country';
    attributes: {
        name: string;
    };
}

export interface City extends JsonApiObject {
    id: string;
    type: 'city';
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

export interface Area extends JsonApiObject {
    id: string;
    type: 'area';
    attributes: {
        name: string;
    };
    relationships: {
        city: {
            data: {
                id: string;
                type: 'city';
            };
        };
        w;
    };
}
