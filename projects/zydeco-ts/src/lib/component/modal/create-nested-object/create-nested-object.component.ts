import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeType } from '../../../enum/AttributeType';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
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
    return this.attributeDefinition.title.replace(/(\s)/g, '');
  }

  areAllKeysChosen() {
    return this.attributeDefinition.keyDefinitions.find(keyDefinition => this.delta.get(keyDefinition.deltaSelector) == undefined) == undefined;
  }

  areAllKeysValid() {
    return this.attributeDefinition.keyDefinitions.find(keyDefinition => {
      let value = this.delta.get(keyDefinition.deltaSelector);
      return typeof value == "string" && (value.length < keyDefinition.minlength || value.length > keyDefinition.maxlength);
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

}
