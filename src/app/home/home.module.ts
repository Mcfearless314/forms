import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage, MyNewComponent} from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AddArticleComponentComponent} from "../add-article-component/add-article-component.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ReactiveFormsModule,
      HttpClientModule
    ],
  declarations: [HomePage, MyNewComponent, AddArticleComponentComponent]
})
export class HomePageModule {}
