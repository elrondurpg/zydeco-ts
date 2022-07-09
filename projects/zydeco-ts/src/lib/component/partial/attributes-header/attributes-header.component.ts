import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'zydeco-attributes-header',
  templateUrl: './attributes-header.component.html'
})
export class AttributesHeaderComponent implements OnInit {

  @Input() editType!          :string;
  @Input() fieldLabel         :string  = "Field";
  @Input() currentValueLabel  :string  = "Current Value";
  @Input() newValueLabel      :string  = "New Value";

  constructor() { }

  ngOnInit() {
    
  }

}
