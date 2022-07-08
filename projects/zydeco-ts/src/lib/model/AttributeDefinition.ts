export class AttributeDefinition {
    title:string = "";
    type:string = "string";
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
}

export class AttributeDefinitionBuilder {
    attribute:AttributeDefinition = new AttributeDefinition();
    deltaOnly:boolean = false;

    withTitle(title:string) {
        this.attribute.title = title;
        return this;
    }

    withType(type:string) {
        this.attribute.type = type;
        return this;
    }

    withModelSelector(modelSelector:string) {
        this.attribute.modelSelector = modelSelector;
        return this;
    }

    withDeltaSelector(deltaSelector:string) {
        this.attribute.deltaSelector = deltaSelector;
        return this;
    }

    withItems(items:string[]) {
        this.attribute.items = items;
        return this;
    }

    withMinLength(minlength:number) {
        this.attribute.minlength = minlength;
        return this;
    }

    withMaxLength(maxlength:number) {
        this.attribute.maxlength = maxlength;
        return this;
    }

    withMinValue(minvalue:number) {
        this.attribute.minvalue = minvalue;
        return this;
    }

    withMaxValue(maxvalue:number) {
        this.attribute.maxvalue = maxvalue;
        return this;
    }

    withStep(step:number) {
        this.attribute.step = step;
        return this;
    }

    withRequired(required:boolean) {
        this.attribute.required = required;
        return this;
    }

    withImmutable(immutable:boolean) {
        this.attribute.immutable = immutable;
        return this;
    }

    withInstructions(instructions:string) {
        this.attribute.instructions = instructions;
        return this;
    }

    withDeltaOnly() {
        this.deltaOnly = true;
        return this;
    }

    build() {
        if (this.attribute.title != null) {
            if (this.attribute.modelSelector == null && !this.deltaOnly) {
                this.attribute.modelSelector = (this.attribute.title[0].toLowerCase() + this.attribute.title.substring(1)).replace(" ", "");
            }
            if (this.attribute.deltaSelector == null) {
                this.attribute.deltaSelector = (this.attribute.title[0].toLowerCase() + this.attribute.title.substring(1)).replace(" ", "");
            }
        }

        return this.attribute;
    }
}