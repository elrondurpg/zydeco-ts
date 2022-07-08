import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'zydeco-string-attribute',
  templateUrl: './string-attribute.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringAttributeComponent),
      multi: true
    }
  ]
})
export class StringAttributeComponent extends AttributeComponent {

  override writeValue(value: any) {
    if (value != null && value.trim() == "")
    {
      value = undefined;
    }
    this._updatedValue = value;
    this.onChange(value);
  }

}
