import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AttributeType } from '../../../enum/AttributeType';
import { ModelDefinition } from '../../../model/ModelDefinition';
import { NestedAttributeDefinition } from '../../../model/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-attributes',
  templateUrl: './attributes.component.html'
})
export class AttributesComponent implements OnInit {

  @Input()  editType!             :string;
  @Input()  modelDefinition!      :ModelDefinition;
  @Input()  model!                :ObjectModel;
  @Input()  delta!                :ObjectModel;
  @Input()  refresh!              :Observable<any>;

  emitRefresh                     :Subject<any>       = new Subject<any>();

  showInstructions:boolean = true;

  constructor() {
  }

  ngOnInit() { 
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  getFlatAttributes() {
    return this.modelDefinition.attributes.filter(definition => definition.type != AttributeType.NESTED);
  }

  getNestedAttributes() : NestedAttributeDefinition<any, any>[] {
    return this.modelDefinition.attributes.filter(definition => definition instanceof NestedAttributeDefinition).map(definition => definition as NestedAttributeDefinition<any, any>);
  }

}
