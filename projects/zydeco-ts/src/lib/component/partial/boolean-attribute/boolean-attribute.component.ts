import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'zydeco-boolean-attribute',
  templateUrl: './boolean-attribute.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanAttributeComponent),
      multi: true
    }
  ]
})
export class BooleanAttributeComponent extends AttributeComponent {

  override writeValue(value: any) {
    if ((value != null && value.trim() == "") || value == "undefined")
    {
      value = undefined;
    }
    else if ((value != null && value.trim() == "true"))
    {
      value = true;
    }
    else if ((value != null && value.trim() == "false"))
    {
      value = false;
    }
    this._updatedValue = value;
    this.onChange(value);
  }
}
