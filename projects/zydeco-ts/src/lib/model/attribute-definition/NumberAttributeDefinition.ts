import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class NumberAttributeDefinition extends AttributeDefinition {
    minvalue:number = 0;
    maxvalue:number = Number.MAX_SAFE_INTEGER;
    step:number = 1;

    constructor() {
        super();
        this.type = AttributeType.NUMBER;
    }
}

export class NumberAttributeDefinitionBuilder extends AttributeDefinitionBuilder {

    constructor() {
        super();
        this.attributeDefinition = new NumberAttributeDefinition();
    }

    withMinValue(minvalue:number) {
        (this.attributeDefinition as NumberAttributeDefinition).minvalue = minvalue;
        return this;
    }

    withMaxValue(maxvalue:number) {
        (this.attributeDefinition as NumberAttributeDefinition).maxvalue = maxvalue;
        return this;
    }

    withStep(step:number) {
        (this.attributeDefinition as NumberAttributeDefinition).step = step;
        return this;
    }
}