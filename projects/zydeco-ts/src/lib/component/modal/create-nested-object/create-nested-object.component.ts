import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeType } from '../../../enum/AttributeType';
import { AttributeDefinition } from '../../../model/attribute-definition/AttributeDefinition';
import { NestedAttributeDefinition } from '../../../model/attribute-definition/NestedAttributeDefinition';
import { SelectAttributeDefinition } from '../../../model/attribute-definition/SelectAttributeDefinition';
import { StringAttributeDefinition } from '../../../model/attribute-definition/StringAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-create-nested-object',
  templateUrl: './create-nested-object.component.html'
})
export class CreateNestedObjectComponent implements OnInit {
  @Input()  attributeDefinition! :NestedAttributeDefinition<ObjectModel, ObjectModel>;
  @Input()  deltas!              :ObjectModel[];
  @Output() create               = new EventEmitter();

  readonly AttributeType = AttributeType;

  delta! :ObjectModel;

  constructor() { }

  ngOnInit(): void {
    this.delta = this.attributeDefinition.createDelta();
  }

  getTitle() {
    return "CreateNestedObjectsFor" + this.attributeDefinition.title.replace(/(\s)/g, '');
  }

  areAllKeysChosen() {
    return this.attributeDefinition.keyDefinitions.find(keyDefinition => !keyDefinition.hidden && this.delta.get(keyDefinition.deltaSelector) == undefined) == undefined;
  }

  areAllKeysValid() {
    return this.attributeDefinition.keyDefinitions.filter(keyDefinition => keyDefinition instanceof StringAttributeDefinition).find(keyDefinition => {
      let value = this.delta.get(keyDefinition.deltaSelector);
      return typeof value == "string" && (value.length < (keyDefinition as StringAttributeDefinition).minlength || value.length > (keyDefinition as StringAttributeDefinition).maxlength);
    }) == undefined;
  }

  findMatchingDelta(test:ObjectModel) {
    return this.deltas.find(delta => {
      let match = true;
      this.attributeDefinition.keyDefinitions.forEach(keyDefinition => {
        let deltaValue = delta.get(keyDefinition.deltaSelector); 
        let testValue = test.get(keyDefinition.deltaSelector); 
        if (deltaValue !== testValue) {
          match = false; 
        }
      });
      return match;
    });
  }

  onCreate() {
    this.create.emit(this.delta);
    this.clear();
  } 

  clear() {
    this.delta = this.attributeDefinition.createDelta();
  }

  getSortedItems(keyDefinition:AttributeDefinition) {
    let key = keyDefinition as SelectAttributeDefinition;
    return key.items.filter(item => key.disallowedItems.indexOf(item) == -1).sort();
  }

  getStringKeyDefinition(keyDefinition:AttributeDefinition) {
    return keyDefinition as StringAttributeDefinition;
  }

  getVisibleKeys() {
    return this.attributeDefinition.keyDefinitions.filter(key => !key.hidden);
  }
}
