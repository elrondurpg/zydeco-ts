import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class DateAttributeDefinition extends AttributeDefinition {
    constructor() {
        super();
        this.type = AttributeType.DATE;
    }
}

export class DateAttributeDefinitionBuilder extends AttributeDefinitionBuilder {

    constructor() {
        super();
        this.attributeDefinition = new DateAttributeDefinition();
    }
}