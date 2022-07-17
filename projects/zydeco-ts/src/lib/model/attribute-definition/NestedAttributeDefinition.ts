import { plainToClass } from 'class-transformer';
import { AttributeType } from '../../enum/AttributeType';
import { AttributeDefinition, AttributeDefinitionBuilder } from '../attribute-definition/AttributeDefinition';
import { ObjectModel } from '../ObjectModel';

export class NestedAttributeDefinition<ModelClass extends ObjectModel, DeltaClass extends ObjectModel> extends AttributeDefinition {
    keyDefinitions:AttributeDefinition[] = [];
    fieldDefinitions:AttributeDefinition[] = [];
    allowDuplicates:boolean = false;

    constructor(
        public modelClass : new () => ModelClass, 
        public deltaClass : new () => DeltaClass) {
        super();
        this.type = AttributeType.NESTED;
    }

    override refresh(): void {
        super.refresh();
        this.keyDefinitions.forEach(keyDefinition => keyDefinition.refresh());
        this.fieldDefinitions.forEach(fieldDefinition => fieldDefinition.refresh());
    }

    createDeltaClone(model:ModelClass) :DeltaClass {
        let delta = plainToClass(this.deltaClass, new this.deltaClass());

        this.keyDefinitions.forEach(keyDefinition => {
            let value = model.get(keyDefinition.modelSelector);
            delta.set(keyDefinition.deltaSelector, value);
        });

        return delta;
    }

    createDelta() {
        return new this.deltaClass();
    }
}

export class NestedAttributeDefinitionBuilder<ModelClass extends ObjectModel, DeltaClass extends ObjectModel> extends AttributeDefinitionBuilder {
    constructor(protected modelClass : new () => ModelClass, 
    protected deltaClass : new () => DeltaClass) {
        super();
        this.attributeDefinition = new NestedAttributeDefinition<ModelClass, DeltaClass>(modelClass, deltaClass);
    }

    withKeyDefinitions(keyDefinitions:AttributeDefinition[]) {
        (this.attributeDefinition as NestedAttributeDefinition<ModelClass, DeltaClass>).keyDefinitions = keyDefinitions;
        return this;
    }

    withFieldDefinitions(fieldDefinitions:AttributeDefinition[]) {
        (this.attributeDefinition as NestedAttributeDefinition<ModelClass, DeltaClass>).fieldDefinitions = fieldDefinitions;
        return this;
    }

    withAllowDuplicates(allowDuplicates:boolean) {
        (this.attributeDefinition as NestedAttributeDefinition<ModelClass, DeltaClass>).allowDuplicates = allowDuplicates;
        return this;
    }
}