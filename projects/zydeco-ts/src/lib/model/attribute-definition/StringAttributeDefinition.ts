import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class StringAttributeDefinition extends AttributeDefinition {
    minlength:number = 0;
    maxlength:number = 524288;

    constructor() {
        super();
        this.type = AttributeType.STRING;
    }

    override getValidationErrors(value: any): string[] {
        let errors = super.getValidationErrors(value);
        if (!this.isEmpty(value)
            && (value.trim().length > this.maxlength || value.trim().length < this.minlength)) {
                errors.push(`${this.title} must be between ${this.minlength} and ${this.maxlength} characters long.`);
        }
        return errors;
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