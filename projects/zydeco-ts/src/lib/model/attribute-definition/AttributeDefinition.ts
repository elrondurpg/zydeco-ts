import { AttributeType } from "../../enum/AttributeType";

export abstract class AttributeDefinition {
    title:string = "";
    type:AttributeType = AttributeType.STRING;
    modelSelector:string = "";
    deltaSelector:string = "";
    required:boolean = false;
    immutable:boolean = false;
    instructions:string = "";
    filterable:boolean = false;
    hidden:boolean = false;

    refresh() {

    }
}

export abstract class AttributeDefinitionBuilder {
    attributeDefinition!:AttributeDefinition;
    deltaOnly:boolean = false;

    withTitle(title:string) {
        this.attributeDefinition.title = title;
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

    withHidden(hidden:boolean) {
        this.attributeDefinition.hidden = hidden;
        return this;
    }

    build() {
        if (this.attributeDefinition.title != null) {
            if (this.attributeDefinition.modelSelector == "" && !this.deltaOnly) {
                this.attributeDefinition.modelSelector = (this.attributeDefinition.title[0].toLowerCase() + this.attributeDefinition.title.substring(1)).replace(/\s/g, "");
            }
            if (this.attributeDefinition.deltaSelector == "") {
                this.attributeDefinition.deltaSelector = (this.attributeDefinition.title[0].toLowerCase() + this.attributeDefinition.title.substring(1)).replace(/\s/g, "");
            }
        }

        return this.attributeDefinition;
    }
}