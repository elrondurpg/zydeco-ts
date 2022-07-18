import { AttributeDefinition } from "./attribute-definition/AttributeDefinition";

export class ModelDefinition {
    attributes:AttributeDefinition[] = [];

    constructor(attributes:AttributeDefinition[]) {
        this.attributes = attributes;
    }

    removeAttribute(title:string) {
        this.attributes = this.attributes.filter(attributeDefinition => attributeDefinition.title != title);
    }

    getAttribute(title:string) {
        return this.attributes.find(attributeDefinition => attributeDefinition.title == title);
    }
}