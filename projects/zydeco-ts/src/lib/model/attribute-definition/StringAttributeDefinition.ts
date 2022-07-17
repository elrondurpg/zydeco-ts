import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class StringAttributeDefinition extends AttributeDefinition {
    minlength:number = 0;
    maxlength:number = 524288;

    constructor() {
        super();
        this.type = AttributeType.STRING;
    }
}

export class StringAttributeDefinitionBuilder extends AttributeDefinitionBuilder {

    constructor() {
        super();
        this.attributeDefinition = new StringAttributeDefinition();
    }

    withMinLength(minlength:number) {
        (this.attributeDefinition as StringAttributeDefinition).minlength = minlength;
        return this;
    }

    withMaxLength(maxlength:number) {
        (this.attributeDefinition as StringAttributeDefinition).maxlength = maxlength;
        return this;
    }
}