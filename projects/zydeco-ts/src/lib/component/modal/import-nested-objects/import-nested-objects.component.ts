import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeType } from '../../../enum/AttributeType';
import { AnyObjectModel } from '../../../model/AnyObjectModel';
import { AttributeDefinition } from '../../../model/attribute-definition/AttributeDefinition';
import { NestedAttributeDefinition } from '../../../model/attribute-definition/NestedAttributeDefinition';
import { SelectAttributeDefinition } from '../../../model/attribute-definition/SelectAttributeDefinition';
import { StringAttributeDefinition } from '../../../model/attribute-definition/StringAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-import-nested-objects',
  templateUrl: './import-nested-objects.component.html'
})
export class ImportNestedObjectsComponent implements OnInit {
  @Input()  attributeDefinition! :NestedAttributeDefinition<ObjectModel, ObjectModel>;
  @Output() create               = new EventEmitter();

  values      :ObjectModel  = new AnyObjectModel();

  readonly AttributeType = AttributeType;

  constructor() {
   }

  ngOnInit(): void {
    this.values.set('imports', "");
  }

  onCreate() {
    this.create.emit(this.values);
  }

  getTitle() {
    return "newImportNestedObjectsFor" + this.attributeDefinition.title.replace(/(\s)/g, '') + "Modal";
  }

  getImportAttribute() {
    return this.attributeDefinition.keyDefinitions[0];
  }

  getSortedItems(fieldDefinition:AttributeDefinition) {
    return (fieldDefinition as SelectAttributeDefinition).items.sort();
  }

  getStringFieldDefinition(fieldDefinition:AttributeDefinition) {
    return fieldDefinition as StringAttributeDefinition;
  }

  isValid() {
    return this.attributeDefinition.fieldDefinitions.find(fieldDefinition => {
      return fieldDefinition.getValidationErrors(this.values.get(fieldDefinition.deltaSelector)).length != 0;
    }) == undefined;
  }

  onShow() {
    this.values = new AnyObjectModel();
    this.values.set('imports', "");
  }

}
