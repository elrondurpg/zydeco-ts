import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'zydeco-number-attribute',
  templateUrl: './number-attribute.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberAttributeComponent),
      multi: true
    }
  ]
})
export class NumberAttributeComponent extends AttributeComponent {

  override writeValue(value: any) {
    if (value == null)
    {
      value = undefined;
    }
    this._updatedValue = value;
    this.onChange(value);
  }

}
