import { AttributeDefinition } from "./attribute-definition/AttributeDefinition";

export class ModelDefinition {
    attributes:AttributeDefinition[] = [];

    constructor(attributes:AttributeDefinition[]) {
        this.attributes = attributes;
    }
}