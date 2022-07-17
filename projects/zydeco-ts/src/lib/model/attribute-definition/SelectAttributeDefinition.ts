import { Observable } from "rxjs";
import { AttributeType } from "../../enum/AttributeType";
import { AttributeDefinition, AttributeDefinitionBuilder } from "./AttributeDefinition";

export class SelectAttributeDefinition extends AttributeDefinition {
    items:string[] = [];
    disallowedItems:string[] = [];
    itemsObservable!:Observable<any>;

    constructor() {
        super();
        this.type = AttributeType.SELECT;
    }

    override refresh() {
        this.refreshItems();
    }

    refreshItems() {
        if (this.itemsObservable != undefined) {
            this.itemsObservable.subscribe(items => {
                this.items.length = 0;
                this.items.push(...items);
            });
        }
    }
}

export class SelectAttributeDefinitionBuilder extends AttributeDefinitionBuilder {

    constructor() {
        super();
        this.attributeDefinition = new SelectAttributeDefinition();
    }

    withItems(items:string[]) {
        (this.attributeDefinition as SelectAttributeDefinition).items = items;
        return this;
    }

    withItemsFromObservable(observable:Observable<any>) {
        (this.attributeDefinition as SelectAttributeDefinition).itemsObservable = observable;
        observable.subscribe(items => {
            (this.attributeDefinition as SelectAttributeDefinition).items.push(...items)
        });
        return this;
    }

    withDisallowedItems(disallowedItems:string[]) {
        (this.attributeDefinition as SelectAttributeDefinition).disallowedItems = disallowedItems;
        return this;
    }
}