import { Component, Input, OnInit } from '@angular/core';
import { AttributeDefinition } from 'zydeco-ts';
import { AttributeType } from '../../../enum/AttributeType';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';


@Component({
  selector: 'zydeco-nested-attribute',
  templateUrl: './nested-attribute.component.html'
})
export class NestedAttributeComponent implements OnInit {

  @Input()  attributeDefinition!  :NestedAttributeDefinition<any, any>;
  @Input()  editType!             :string;
  @Input()  models!               :ObjectModel[];
  @Input()  deltas!               :ObjectModel[];

  filters :any = {};

  readonly AttributeType = AttributeType;

  constructor() { }

  ngOnInit(): void {
    this.models.forEach(model => {
      let delta = this.findMatchingDelta(model);
      if (delta == null) {
        this.deltas.push(this.attributeDefinition.createDeltaClone(model));
      }
    });
  }

  findMatchingDelta(model:ObjectModel) {
    return this.deltas.find(delta => {
      let match = true;
      this.attributeDefinition.keyDefinitions.forEach(keyDefinition => {
        let modelValue = model.get(keyDefinition.modelSelector); 
        let deltaValue = delta.get(keyDefinition.deltaSelector); 
        if (modelValue !== deltaValue) {
          match = false; 
        }
      });
      return match;
    });
  }

  findMatchingModel(delta:ObjectModel) {
    return this.models.find(model => {
      let match = true;
      this.attributeDefinition.keyDefinitions.forEach(keyDefinition => {
        let modelValue = model.get(keyDefinition.modelSelector); 
        let deltaValue = delta.get(keyDefinition.deltaSelector); 
        if (modelValue !== deltaValue) {
          match = false; 
        }
      });
      return match;
    });
  }

  getCollapsedTitle() {
    if (this.attributeDefinition.title != null) {
      return this.attributeDefinition.title.replace(/(\s)/g, '');
    }
    else return "";
  }

  getFilterableKeys() {
    return this.attributeDefinition.keyDefinitions.filter(key => key.filterable);
  }

  getFilteredDeltas() {
    return this.deltas.filter(delta => {
      let match = true;
      Object.keys(this.filters).forEach(key => {
        let filter = this.filters[key];
        let value = delta.get(key);
        if (value instanceof String && value.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
          match = false;
        }
      });
      return match;
    }).sort((a, b) => {
      for (let i = 0; i < this.attributeDefinition.keyDefinitions.length; i++) {
          let keyDefinition = this.attributeDefinition.keyDefinitions[i];
          let valueA = a.get(keyDefinition.deltaSelector);
          let valueB = b.get(keyDefinition.deltaSelector);
          if (valueA < valueB) return -1;
          else if (valueB > valueA) return 1;
      }
      return 0;
    });
  }

  isEmpty() {
    return this.models.length == 0 && this.deltas.length == 0;
  }
}
