import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AttributeType } from '../../../enum/AttributeType';
import { ModelDefinition } from '../../../model/ModelDefinition';
import { NestedAttributeDefinition } from '../../../model/attribute-definition/NestedAttributeDefinition';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-attributes',
  templateUrl: './attributes.component.html'
})
export class AttributesComponent implements OnInit, OnChanges {

  @Input()  editType!             :string;
  @Input()  model!                :ObjectModel;
  @Input()  delta!                :ObjectModel;
  @Input()  refresh!              :Observable<any>;

  @Output() valueChanged                = new EventEmitter();

  emitRefresh                     :Subject<any>       = new Subject<any>();

  showInstructions:boolean = true;

  private _modelDefinition: ModelDefinition = new ModelDefinition([]);
    
  @Input() set modelDefinition(value: ModelDefinition) {
      this._modelDefinition = value;
  }
    
  get modelDefinition(): ModelDefinition {
      return this._modelDefinition;
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() { }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  getFlatAttributes() {
    return this.modelDefinition.attributes.filter(definition => definition.type != AttributeType.NESTED);
  }

  getNestedAttributes() : NestedAttributeDefinition<any, any>[] {
    return this.modelDefinition.attributes.filter(definition => definition instanceof NestedAttributeDefinition).map(definition => definition as NestedAttributeDefinition<any, any>);
  }

  onChange(attribute:any) {
    this.valueChanged.emit(attribute);
  }
}
