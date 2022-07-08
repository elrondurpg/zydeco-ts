import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'zydeco-date-attribute',
  templateUrl: './date-attribute.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateAttributeComponent),
      multi: true
    }
  ]
})
export class DateAttributeComponent extends AttributeComponent {}
