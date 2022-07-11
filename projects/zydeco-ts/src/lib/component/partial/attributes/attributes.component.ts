import { Component, Input, OnInit } from '@angular/core';
import { ModelDefinition } from '../../../model/ModelDefinition';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-attributes',
  templateUrl: './attributes.component.html'
})
export class AttributesComponent implements OnInit {

  @Input() editType!        :string;
  @Input() modelDefinition! :ModelDefinition;
  @Input() model!           :ObjectModel;
  @Input() delta!           :ObjectModel;

  showInstructions:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  getFlatAttributes() {
    return this.modelDefinition.attributes.filter(definition => definition.type != "nested");
  }

  getNestedAttributes() : NestedAttributeDefinition<any, any>[] {
    return this.modelDefinition.attributes.filter(definition => definition instanceof NestedAttributeDefinition).map(definition => definition as NestedAttributeDefinition<any, any>);
  }

  getCurrentDeltaValue(selector:string) : any {
    return this.delta[selector as keyof typeof this.delta];
  }

  setCurrentDeltaValue(selector:string, value:any) {
    this.delta[selector as keyof typeof this.delta] = value;
  }

  getCurrentModelValue(selector:string) {
    if (selector == null) {
      return null;
    }

    let tokens = selector.split("\.");
    let curr:any = this.model;
    for (let i = 0; i < tokens.length; i++) {
      if (curr != null) {
        curr = curr[tokens[i]];
      }
    }
    return curr;
  }

}
