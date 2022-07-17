import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeType } from '../../../enum/AttributeType';
import { AttributeDefinition } from '../../../model/attribute-definition/AttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-attribute-row',
  templateUrl: './attribute-row.component.html'
})
export class AttributeRowComponent implements OnInit {

  @Input() attributeDefinition! :AttributeDefinition;
  @Input() currentValue!        :string;
  @Input() editType!            :string;
  @Input() delta!               :ObjectModel;

  @Output() valueChanged = new EventEmitter();

  readonly AttributeType = AttributeType;

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedCurrentValue() {
    if (this.currentValue != null) {
      if (this.attributeDefinition.type == AttributeType.DATE) {
        return formatDate(this.currentValue, "yyyy-MM-dd", "en-US", "UTC");
      }
      else {
        return this.currentValue;
      }
    }
    return '';
  }

  onChange(event:any) {
    this.valueChanged.emit(event);
  }

}
