import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class BooleanAttributeDefinition extends AttributeDefinition {
    constructor() {
        super();
        this.type = AttributeType.BOOLEAN;
    }
}

export class BooleanAttributeDefinitionBuilder extends AttributeDefinitionBuilder {

    constructor() {
        super();
        this.attributeDefinition = new BooleanAttributeDefinition();
    }
}