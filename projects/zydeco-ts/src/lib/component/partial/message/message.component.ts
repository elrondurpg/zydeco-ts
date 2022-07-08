import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zydeco-message',
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {
  message:string = "";
  status:string = "";
  errors:string[] = [];

  constructor() { }

  ngOnInit() {
  }

  clear() {
    this.message = "";
    this.status = "";
    this.errors.length = 0;
  }

  showSuccess(message:string) {
    this.status = "success";
    this.message = message;
  }

  showError(message:string) {
    this.status = "error";
    this.message = message;
  }

  showErrorArray(header:string, errors:string[]) {
    this.status = "errorArray";
    this.message = header;
    this.errors = errors; 
  }

}
