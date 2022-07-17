import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { AttributeDefinition } from '../../../model/attribute-definition/AttributeDefinition';

@Component({
  selector: 'zydeco-attribute',
  template: ''
})
export abstract class AttributeComponent implements ControlValueAccessor, OnInit {

  @Input() attributeDefinition! :AttributeDefinition;
  @Input() editType!            :string;

  @Output() change = new EventEmitter();

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

  onChange = (_ : any) => { this.change.emit(this.attributeDefinition.title) };
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
