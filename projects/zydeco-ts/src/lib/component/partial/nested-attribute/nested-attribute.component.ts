import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { AttributeType } from '../../../enum/AttributeType';
import { AnyObjectModel } from '../../../model/AnyObjectModel';
import { NestedAttributeDefinition } from '../../../model/attribute-definition/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';
import { CreateNestedObjectComponent } from '../../modal/create-nested-object/create-nested-object.component';
import { ImportNestedObjectsComponent } from '../../modal/import-nested-objects/import-nested-objects.component';
import { MessageComponent } from '../message/message.component';


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

  @ViewChild('messageBox', {static: false})
  messageBox!: MessageComponent;

  @ViewChild('createNestedObjectModal', {static: false})
  createNestedObjectModal!: CreateNestedObjectComponent;

  @ViewChild('importNestedObjectsModal', {static: false})
  importNestedObjectsModal!: ImportNestedObjectsComponent;

  readonly AttributeType = AttributeType;

  constructor() { }

  ngOnChanges() {
    if (this.models != null) {
      this.models.forEach(model => {
        let delta = this.findMatchingDelta(model);
        if (delta == null) {
          this.deltas.push(this.attributeDefinition.createDeltaClone(model));
        }
      });
    }
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
    if (this.models != null) {
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
    return null;
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

  addDeltaFromModal(delta:ObjectModel) {
    delta = plainToClass(this.attributeDefinition.deltaClass, delta);
    delta.dirty = true;
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

  getVisibleKeys() {
    return this.attributeDefinition.keyDefinitions.filter(key => !key.hidden);
  }

  getVisibleFields() {
    return this.attributeDefinition.fieldDefinitions.filter(field => !field.hidden);
  }

  findDeltaByKey(deltaSelector:string, key:string) : ObjectModel | undefined {
    return this.deltas.find(delta => delta.get(deltaSelector) == key);
  }

  importValues(values:AnyObjectModel) {
    let tokens = values.get("imports").split(",");

    let invalidKeys:string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      let key = tokens[i].trim();
      if (key != undefined && key != null && key != "" && this.attributeDefinition.keyDefinitions[0].isValidKey(key) && this.findDeltaByKey(this.attributeDefinition.keyDefinitions[0].deltaSelector, key) == undefined) {
        let delta = new this.attributeDefinition.deltaClass();
        delta = plainToClass(this.attributeDefinition.deltaClass, delta);
        delta.set(this.attributeDefinition.keyDefinitions[0].deltaSelector, key);
        this.attributeDefinition.fieldDefinitions.forEach(fieldDefinition => {
          delta.set(fieldDefinition.deltaSelector, values.get(fieldDefinition.deltaSelector));
        });
        delta.dirty = true;
        this.deltas.push(delta);
      }
      else if (key != undefined && key != null && key != "") {
        invalidKeys.push(key);
      }
    }

    if (invalidKeys.length != 0) {
      let error = "The following keys were not imported: ";
      for (let i = 0; i < invalidKeys.length; i++) {
        error += invalidKeys[i];
        if (i < invalidKeys.length - 1) {
          error += ", ";
        }
      }
      this.messageBox.showError(error);
    }
  }
}
