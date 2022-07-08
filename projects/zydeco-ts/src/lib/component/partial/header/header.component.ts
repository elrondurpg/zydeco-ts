import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../model/Breadcrumb';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'zydeco-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() breadcrumbs  :Breadcrumb[] = [];
  @Input() complex!     :boolean;
  @Input() changes!     :boolean;
  @Input() items!       :any[];
  @Input() title!       :string;

  @Output() create  = new EventEmitter();
  @Output() save    = new EventEmitter();
  @Output() load    = new EventEmitter();

  @ViewChild('messageBox', {static: false})
  messageBox!: MessageComponent;

  constructor() { }

  ngOnInit() {

  }

  clearMessage() {
    this.messageBox.clear();
  }

  showSuccessMessage(message:string) {
    this.messageBox.showSuccess(message);
  }

  showErrorMessage(message:string) {
    this.messageBox.showError(message);
  }
  
  showErrorMessageArray(header:string, errors:string[]) {
    this.messageBox.showErrorArray(header, errors);
  }

  emitCreate() {
    this.create.emit();
  }
  
  emitSave() {
    this.save.emit();
  }

  emitLoad(event:any) {
    this.load.emit(event);
  }
}
