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
  filters:any = {};

  constructor() { }

  ngOnInit(): void {

  }

  getCollapsedTitle() {
    if (this.attributeDefinition.title != null) {
      return this.attributeDefinition.title.replace(/(\s)/g, '');
    }
  }

  getFilterableKeys() {
    return this.attributeDefinition.keyDefinitions.filter(key => key.filterable);
  }

  getFilteredDeltas() {
    return this.deltas.filter(delta => {
      Object.keys(this.filters).forEach(key => {
        let filter = this.filters[key];
        let value = delta[key as keyof typeof delta];
        if (value instanceof String && value.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
          return false;
        }
      });
      return true;
    });
  }

  isEmpty() {
    return this.models.length == 0 && this.deltas.length == 0;
  }
}
