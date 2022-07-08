import { AttributeDefinition } from "./AttributeDefinition";

export class ModelDefinition {
    attributes:AttributeDefinition[];

    constructor(attributes:AttributeDefinition[]) {
        this.attributes = attributes;
    }
}