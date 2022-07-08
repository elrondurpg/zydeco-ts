import { Injector, NgModule } from '@angular/core';
import { HeaderComponent } from './component/partial/header/header.component';
import { MessageComponent } from './component/partial/message/message.component';
import { SearchComponent } from './component/partial/search/search.component';
import { AttributesComponent } from './component/partial/attributes/attributes.component';
import { StringAttributeComponent } from './component/partial/string-attribute/string-attribute.component';
import { BooleanAttributeComponent } from './component/partial/boolean-attribute/boolean-attribute.component';
import { SelectAttributeComponent } from './component/partial/select-attribute/select-attribute.component';
import { DateAttributeComponent } from './component/partial/date-attribute/date-attribute.component';
import { NumberAttributeComponent } from './component/partial/number-attribute/number-attribute.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    MessageComponent,
    SearchComponent,
    AttributesComponent,
    StringAttributeComponent,
    BooleanAttributeComponent,
    SelectAttributeComponent,
    DateAttributeComponent,
    NumberAttributeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AttributesComponent,
    HeaderComponent
  ]
})
export class ZydecoTs { 
  static injector: Injector;
  constructor(injector: Injector) {
    ZydecoTs.injector = injector;
  }
}
