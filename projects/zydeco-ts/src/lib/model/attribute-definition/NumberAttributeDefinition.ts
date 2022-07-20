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

    override getValidationErrors(value: any): string[] {
        let errors = super.getValidationErrors(value);
        if (!this.isEmpty(value)) {
            if (value < this.minvalue) {
                errors.push(`${this.title} must be at least ${this.minvalue }.`);
            }        
            if (value > this.maxvalue) {
                errors.push(`${this.title} must be less than ${this.maxvalue }.`);
            }        
        }
        return errors;
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