import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { Breadcrumb } from '../../model/Breadcrumb';
import { ModelDefinition } from '../../model/ModelDefinition';
import { ObjectModel } from '../../model/ObjectModel';
import { RestService } from '../../service/rest.service';
import { ZydecoTs } from '../../zydeco-ts.module';
import { HeaderComponent } from '../partial/header/header.component';

@Component({
  selector: 'zydeco-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent<ModelClass extends ObjectModel, DeltaClass extends ObjectModel> implements OnInit {

  protected service         :RestService;
  public model!          :ModelClass;
  public delta!          :DeltaClass;

  public items           :any[]            = [];
  public complex         :boolean          = false;
  public breadcrumbs     :Breadcrumb[]     = [];
  public modelDefinition :ModelDefinition  = new ModelDefinition([]);
  public api             :string           = "";
  public editType        :string           = "update";
  public title           :string           = "";

  @ViewChild('header', {static: false})
  protected header!         :HeaderComponent;

  constructor(
    @Inject("string") protected modelType : new () => ModelClass,
    @Inject("string") protected deltaType : new () => DeltaClass,
    protected route     : ActivatedRoute
  ) { 
    this.service  = ZydecoTs.injector.get(RestService);
    this.delta    = new this.deltaType();
  }

  ngOnInit() {
    this.loadItems();
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.load(params['name']);
      }
    });
  }

  loadItems() {
    this.service.get(this.api).subscribe(items => this.items = items);
  }

  create() {
    this.editType = "create";
    this.delta    = new this.deltaType();
  }

  load(param:any) {
    this.editType = "update";
    this.delta    = new this.deltaType();
    this.service.get(this.api, param).subscribe(model => {
      this.model = plainToClass(this.modelType, model);
    });
  }

  save() {
    if (this.editType == "update") {
      this.service.put(this.api, this.model.getId(), this.delta).subscribe({
        next: model => this.showSuccessMessage(model),
        error: error => this.showErrorMessage(error)
      });
    }
    else if (this.editType == "create") {
      this.service.post(this.api, [], this.delta).subscribe({
        next: model => this.showSuccessMessage(model),
        error: error => this.showErrorMessage(error)
      });
    }
  }

  showSuccessMessage(model:any) {
    this.loadItems();
    this.header.clearMessage();
    this.header.showSuccessMessage(`${this.modelType.name} ${this.editType}d successfully!`);
    this.editType = "update";
    this.delta = new this.deltaType();
    this.model = plainToClass(this.modelType, model);
  }

  showErrorMessage(error:any) {
    this.header.clearMessage();
    if (error.error.errors !== undefined) {
      let messages = error.error.errors.map((message:any) => {
        return `Field "${message.field}": ${message.defaultMessage}.`;
      });
      this.header.showErrorMessageArray(`${this.modelType.name} could not be ${this.editType}d.`, messages);
    }
    else {
      this.header.showErrorMessage(`${this.modelType.name} could not be ${this.editType}d. Error: ${error.error.message}`);
    }
  }

  detectChanges() {
    return !this.delta.isEmpty();
  }

}