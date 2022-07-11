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
        this.type = "nested";
        this.modelSelector = modelSelector;
        this.deltaSelector = deltaSelector;
    }
}