import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ResourceComponent } from '../../resource/resource.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'zydeco-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() parent!: ResourceComponent<any, any>;

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
}
