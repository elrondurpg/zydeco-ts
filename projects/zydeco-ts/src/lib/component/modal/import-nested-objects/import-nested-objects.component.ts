import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeType } from 'zydeco-ts';
import { NestedAttributeDefinition } from '../../../model/attribute-definition/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-import-nested-objects',
  templateUrl: './import-nested-objects.component.html'
})
export class ImportNestedObjectsComponent implements OnInit {
  @Input()  attributeDefinition! :NestedAttributeDefinition<ObjectModel, ObjectModel>;
  @Output() create               = new EventEmitter();

  importList  :string   = "";
  values                = {};

  readonly AttributeType = AttributeType;

  constructor() { }

  ngOnInit(): void {
  }

  getTitle() {
    return "ImportNestedObjectsFor" + this.attributeDefinition.title.replace(/(\s)/g, '');
  }

  getImportAttribute() {
    return this.attributeDefinition.keyDefinitions[0];
  }

}
