import { Injector, NgModule } from '@angular/core';
import { RestService } from './service/rest.service';
import { ResourceComponent } from './component/resource/resource.component';
import { HeaderComponent } from './component/partial/header/header.component';
import { MessageComponent } from './component/partial/message/message.component';
import { SearchComponent } from './component/partial/search/search.component';
import { AttributesComponent } from './component/partial/attributes/attributes.component';
import { StringAttributeComponent } from './component/partial/string-attribute/string-attribute.component';
import { BooleanAttributeComponent } from './component/partial/boolean-attribute/boolean-attribute.component';
import { SelectAttributeComponent } from './component/partial/select-attribute/select-attribute.component';
import { DateAttributeComponent } from './component/partial/date-attribute/date-attribute.component';
import { NumberAttributeComponent } from './component/partial/number-attribute/number-attribute.component';
import { AttributeComponent } from './component/partial/attribute/attribute.component';



@NgModule({
  declarations: [
    RestService,
    ResourceComponent,
    HeaderComponent,
    MessageComponent,
    SearchComponent,
    AttributesComponent,
    StringAttributeComponent,
    BooleanAttributeComponent,
    SelectAttributeComponent,
    DateAttributeComponent,
    NumberAttributeComponent,
    AttributeComponent
  ],
  imports: [
  ],
  exports: [
    RestService,
    ResourceComponent
  ]
})
export class ZydecoTs { 
  static injector: Injector;
  constructor(injector: Injector) {
    ZydecoTs.injector = injector;
  }
}
