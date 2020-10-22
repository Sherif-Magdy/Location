export interface JsonApiObject {
    id: string;
    type: string;
    attributes?: { [key: string]: any };
    relationships?: {
        [key: string]:
            | {
                  data: JsonApiResourceIdentifier | JsonApiResourceIdentifier[];
                  links?: { [key: string]: string | undefined };
                  meta?: {};
              }
            | undefined;
    };
    links?: { [key: string]: string | undefined };
    meta?: { [key: string]: any };
}
export interface JsonApiResourceIdentifier {
    id: string;
    type: string;
}
