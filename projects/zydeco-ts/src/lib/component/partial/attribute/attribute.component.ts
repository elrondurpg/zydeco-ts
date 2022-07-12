import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { AttributeType } from '../../../enum/AttributeType';
import { AttributeDefinition } from '../../../model/AttributeDefinition';

@Component({
  selector: 'zydeco-attribute',
  template: ''
})
export abstract class AttributeComponent implements ControlValueAccessor, OnInit {

  @Input() attributeDefinition! :AttributeDefinition;
  @Input() editType!            :string;

  protected _updatedValue :any = undefined;

  constructor() { }

  ngOnInit(): void {
  }
  
  get updatedValue():any { 
    return this._updatedValue; 
  };

  set updatedValue(v: any) {
    if (v !== this._updatedValue) {
      this.writeValue(v);
    }
  }
  
  writeValue(value: any) {
    if (value != null && value.trim() == "")
    {
      value = undefined;
    }
    this._updatedValue = value;
    this.onChange(value);
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange = (_ : any) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
