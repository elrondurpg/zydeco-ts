import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributeComponent } from '../attribute/attribute.component';
import { SelectAttributeDefinition } from '../../../model/attribute-definition/SelectAttributeDefinition';

@Component({
  selector: 'zydeco-select-attribute',
  templateUrl: './select-attribute.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAttributeComponent),
      multi: true
    }
  ]
})
export class SelectAttributeComponent extends AttributeComponent {

  override writeValue(value: any) {
    if ((value != null && value.trim() == "") || value == "undefined")
    {
      value = undefined;
    }
    this._updatedValue = value;
    this.onChange(value);
  }

  getSortedItems() {
    let attr = this.attributeDefinition as SelectAttributeDefinition;
    return attr.items.filter(item => attr.disallowedItems.indexOf(item) == -1).sort();
  }

  getSelectAttributeDefinition() {
    return this.attributeDefinition as SelectAttributeDefinition;
  }
}
