import { AttributeType } from "../../enum/AttributeType";

export abstract class AttributeDefinition {
    title:string            = "";
    type:AttributeType      = AttributeType.STRING;
    modelSelector:string    = "";
    deltaSelector:string    = "";
    required:boolean        = false;
    immutable:boolean       = false;
    instructions:string     = "";
    filterable:boolean      = false;
    hidden:boolean          = false;
    importable:boolean      = false;
    urlBase:string          = "";

    refresh() {

    }

    isValidKey(key:any) {
        return true;
    }

    isEmpty(value:any) {
        return value == undefined || value == null || (value instanceof String && value.trim() == "");
    }

    getValidationErrors(value:any) {
        let errors:string[] = [];
        if (this.required && this.isEmpty(value)) {
            errors.push("Please provide a value for " + this.title);
        }
        return errors;
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
    
    withUrlBase(urlBase:string) {
        this.attributeDefinition.urlBase = urlBase;
        return this;
    }

    withImportable(importable:boolean) {
        this.attributeDefinition.importable = importable;
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