import { plainToClass } from 'class-transformer';
import { AttributeType } from '../enum/AttributeType';
import { AttributeDefinition, AttributeDefinitionBuilder } from './AttributeDefinition';
import { ObjectModel } from './ObjectModel';

export class NestedAttributeDefinition<ModelClass extends ObjectModel, DeltaClass extends ObjectModel> extends AttributeDefinition {
    keyDefinitions:AttributeDefinition[] = [];
    fieldDefinitions:AttributeDefinition[] = [];

    constructor(
        public modelClass : new () => ModelClass, 
        public deltaClass : new () => DeltaClass) {
        super();
        this.type = AttributeType.NESTED;
    }

    override refreshItems(): void {
        super.refreshItems();
        this.keyDefinitions.forEach(keyDefinition => keyDefinition.refreshItems());
        this.fieldDefinitions.forEach(fieldDefinition => fieldDefinition.refreshItems());
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
    override attributeDefinition!:NestedAttributeDefinition<ModelClass, DeltaClass>;

    constructor(protected modelClass : new () => ModelClass, 
    protected deltaClass : new () => DeltaClass) {
        super();
        this.attributeDefinition = new NestedAttributeDefinition<ModelClass, DeltaClass>(modelClass, deltaClass);
    }

    withKeyDefinitions(keyDefinitions:AttributeDefinition[]) {
        this.attributeDefinition.keyDefinitions = keyDefinitions;
        return this;
    }

    withFieldDefinitions(fieldDefinitions:AttributeDefinition[]) {
        this.attributeDefinition.fieldDefinitions = fieldDefinitions;
        return this;
    }
}