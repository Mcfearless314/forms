import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {AddArticleComponentComponent} from "../add-article-component/add-article-component.component";


const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add-article-component',
    component: AddArticleComponentComponent,
    title: 'Add Article'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {

}
