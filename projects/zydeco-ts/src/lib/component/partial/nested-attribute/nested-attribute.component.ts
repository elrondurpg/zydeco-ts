import { Component, Input, OnInit } from '@angular/core';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';


@Component({
  selector: 'zydeco-nested-attribute',
  templateUrl: './nested-attribute.component.html'
})
export class NestedAttributeComponent implements OnInit {

  @Input() attributeDefinition! :NestedAttributeDefinition<any, any>;
  @Input() editType!            :string;
  @Input() models!              :ObjectModel[];
  @Input() deltas!              :ObjectModel[];

  constructor() { }

  ngOnInit(): void {

  }

}
