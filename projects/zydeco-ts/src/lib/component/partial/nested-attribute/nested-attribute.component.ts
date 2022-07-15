import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable, Subscription } from 'rxjs';
import { AttributeType } from '../../../enum/AttributeType';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';


@Component({
  selector: 'zydeco-nested-attribute',
  templateUrl: './nested-attribute.component.html'
})
export class NestedAttributeComponent implements OnInit, OnChanges {

  @Input()  attributeDefinition!  :NestedAttributeDefinition<any, any>;
  @Input()  editType!             :string;
  @Input()  models!               :ObjectModel[];
  @Input()  deltas!               :ObjectModel[];
  @Input()  refresh!              :Observable<any>;

  filters :any = {};

  readonly AttributeType = AttributeType;

  constructor() { }

  ngOnChanges() {
    this.models.forEach(model => {
      let delta = this.findMatchingDelta(model);
      if (delta == null) {
        this.deltas.push(this.attributeDefinition.createDeltaClone(model));
      }
    });
  }

  ngOnInit(): void {
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

  sortKeys() {
    return this.attributeDefinition.keyDefinitions.sort((a, b) => {
      return a.filterable == b.filterable? 0 : (a.filterable? -1 : 1);
    });
  }

  getFilteredDeltas():ObjectModel[] {
    return this.deltas.filter(delta => {
      let match = true;
      Object.keys(this.filters).forEach(key => {
        let filter = this.filters[key];
        let value = delta.get(key);
        if (typeof value == "string" && value.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
          match = false;
        }
      });
      return match;
    }).sort((a, b) => {
      for (let i = 0; i < this.attributeDefinition.keyDefinitions.length; i++) {
          let aIsNew = this.findMatchingModel(a) == undefined;
          let bIsNew = this.findMatchingModel(b) == undefined;
          if (aIsNew && !bIsNew) return -1;
          else if (bIsNew && !aIsNew) return 1;

          let keyDefinition = this.attributeDefinition.keyDefinitions[i];
          let valueA = a.get(keyDefinition.deltaSelector);
          let valueB = b.get(keyDefinition.deltaSelector);
          if (valueA < valueB) return -1;
          else if (valueB > valueA) return 1;
      }
      return 0;
    });
  }

  toggleDelete(delta:ObjectModel) {
    let model = this.findMatchingModel(delta);
    if (model === undefined) {
      this.removeDelta(delta);
    }
    else {
      if (delta.delete) {
        delta.delete = undefined;
      }
      else delta.delete = true;
    }
  }

  addDelta(delta:ObjectModel) {
    delta = plainToClass(this.attributeDefinition.deltaClass, delta);
    this.deltas.push(delta);
}

  removeDelta(deltaToRemove:ObjectModel) {
    let index = -1;
    for (let i = 0; i < this.deltas.length; i++) {
        let delta = this.deltas[i];
        if (this.attributeDefinition.keyDefinitions.find(keyDefinition => {
            return deltaToRemove.get(keyDefinition.deltaSelector) != delta.get(keyDefinition.deltaSelector);
        }) == undefined) {
            index = i;
        }
    }
    if (index != -1) {
        this.deltas.splice(index, 1);
    }
}

  isEmpty() {
    return this.models.length == 0 && this.deltas.length == 0;
  }
}
