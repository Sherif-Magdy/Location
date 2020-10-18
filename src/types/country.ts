import {JsonApiObject} from './json-api';

export interface Country extends JsonApiObject {
  id: string;
  type: string;
  attributes: {
    name: string;
  };
}
