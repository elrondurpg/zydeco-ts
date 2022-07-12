import { plainToClass } from 'class-transformer';
import { AttributeType } from '../enum/AttributeType';
import { AttributeDefinition } from './AttributeDefinition';
import { ObjectModel } from './ObjectModel';

export class NestedAttributeDefinition<ModelClass extends ObjectModel, DeltaClass extends ObjectModel> extends AttributeDefinition {
    constructor(
        protected modelClass : new () => ModelClass, 
        protected deltaClass : new () => DeltaClass,
        public keyDefinitions:AttributeDefinition[],
        public fieldDefinitions:AttributeDefinition[],
        modelSelector:string,
        deltaSelector:string) {
        super();
        this.type = AttributeType.NESTED;
        this.modelSelector = modelSelector;
        this.deltaSelector = deltaSelector;
    }

    createDeltaClone(model:ModelClass) :DeltaClass {
        let delta = plainToClass(this.deltaClass, new this.deltaClass());

        this.keyDefinitions.forEach(keyDefinition => {
            let value = model.get(keyDefinition.modelSelector);
            delta.set(keyDefinition.deltaSelector, value);
        });

        return delta;
    }
}