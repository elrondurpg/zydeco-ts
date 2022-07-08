import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectModel } from '../../../model/ObjectModel';

@Component({
  selector: 'zydeco-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Output() create  = new EventEmitter();
  @Output() load    = new EventEmitter();
  @Output() save    = new EventEmitter();

  @Input() items      :any[]    = [];
  @Input() changes    :boolean  = false;
  @Input() filterable :boolean  = true;
  @Input() complex    :boolean  = false;
  
  filter:string = "";

  constructor() { }

  ngOnInit() {
  }

  getSortedItems() {
    if (!this.complex) {
      return this.getSortedSimpleItems();
    }
    else {
      return this.getSortedComplexItems();
    }
  }

  getSortedSimpleItems() {
    return this.items.sort( (a, b) => {
      if ( a.toLowerCase() < b.toLowerCase() ){
        return -1;
      }
      if ( a.toLowerCase() > b.toLowerCase() ){
        return 1;
      }
      return 0;
    });
  }

  getSortedComplexItems() {
    return this.items.sort((a: ObjectModel, b: ObjectModel) => {
      let aName = a.getDisplayName().toLowerCase();
      let bName = b.getDisplayName().toLowerCase();

      if (aName < bName){
        return -1;
      }
      if (aName > bName){
        return 1;
      }
      return 0;
    });
  }

  emitCreate() {
    this.create.emit(null);
  }

  emitLoad() {
    this.load.emit(this.filter);
  }

  emitSave() {
    this.save.emit(null);
  }

}
