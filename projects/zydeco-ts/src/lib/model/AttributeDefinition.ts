import { AttributeType } from "../enum/AttributeType";

export class AttributeDefinition {
    title:string = "";
    type:AttributeType = AttributeType.STRING;
    modelSelector:string = "";
    deltaSelector:string = "";
    minlength:number = 0;
    maxlength:number = 524288;
    minvalue:number = 0;
    maxvalue:number = Number.MAX_SAFE_INTEGER;
    step:number = 1;
    required:boolean = false;
    immutable:boolean = false;
    instructions:string = "";
    items:string[] = [];
    filterable:boolean = false;
}

export class AttributeDefinitionBuilder {
    attributeDefinition:AttributeDefinition = new AttributeDefinition();
    deltaOnly:boolean = false;

    withTitle(title:string) {
        this.attributeDefinition.title = title;
        return this;
    }

    withType(type:AttributeType) {
        this.attributeDefinition.type = type;
        return this;
    }

    withModelSelector(modelSelector:string) {
        this.attributeDefinition.modelSelector = modelSelector;
        return this;
    }

    withDeltaSelector(deltaSelector:string) {
        this.attributeDefinition.deltaSelector = deltaSelector;
        return this;
    }

    withItems(items:string[]) {
        this.attributeDefinition.items = items;
        return this;
    }

    withMinLength(minlength:number) {
        this.attributeDefinition.minlength = minlength;
        return this;
    }

    withMaxLength(maxlength:number) {
        this.attributeDefinition.maxlength = maxlength;
        return this;
    }

    withMinValue(minvalue:number) {
        this.attributeDefinition.minvalue = minvalue;
        return this;
    }

    withMaxValue(maxvalue:number) {
        this.attributeDefinition.maxvalue = maxvalue;
        return this;
    }

    withStep(step:number) {
        this.attributeDefinition.step = step;
        return this;
    }

    withRequired(required:boolean) {
        this.attributeDefinition.required = required;
        return this;
    }

    withImmutable(immutable:boolean) {
        this.attributeDefinition.immutable = immutable;
        return this;
    }

    withInstructions(instructions:string) {
        this.attributeDefinition.instructions = instructions;
        return this;
    }

    withDeltaOnly() {
        this.deltaOnly = true;
        return this;
    }

    withFilterable(filterable:boolean) {
        this.attributeDefinition.filterable = filterable;
        return this;
    }

    build() {
        if (this.attributeDefinition.title != null) {
            if (this.attributeDefinition.modelSelector == "" && !this.deltaOnly) {
                this.attributeDefinition.modelSelector = (this.attributeDefinition.title[0].toLowerCase() + this.attributeDefinition.title.substring(1)).replace(" ", "");
            }
            if (this.attributeDefinition.deltaSelector == "") {
                this.attributeDefinition.deltaSelector = (this.attributeDefinition.title[0].toLowerCase() + this.attributeDefinition.title.substring(1)).replace(" ", "");
            }
        }

        return this.attributeDefinition;
    }
}