import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Myservice} from "../myservice";
import {RouterLink} from "@angular/router";
import {getElement} from "ionicons/dist/types/stencil-public-runtime";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  //templateUrl: 'home.page.html',
  template: `
      <ion-content>
          <ion-item>
              <ion-input type="text" [(ngModel)]="searchTerm" placeholder="Search for article"></ion-input>
            <ion-input type="number" [(ngModel)]="pageSize"  placeholder="Page Size"></ion-input>

          </ion-item>
        <ion-button (click)="filterArticles()">Search</ion-button>

          <ion-button routerLink="add-article-component">Add Article</ion-button>

          <ion-card *ngFor="let article of service.articles" (click)="deleteItem(article)">
              <ion-toolbar>
                  <ion-title>{{article.headline}}</ion-title>
              </ion-toolbar>
              <ion-footer>Author: {{article.author}}</ion-footer>
              <ion-card-content>Content: {{article.body}}</ion-card-content>
              <comp></comp>
          </ion-card>

      </ion-content>
  `,
  styleUrls: ['home.page.scss'],

})
export class HomePage {
  myHeadline = new FormControl('', Validators.required);
  myBody = new FormControl('', Validators.required);
  myAuthor = new FormControl('', [Validators.required, Validators.pattern('(?:Bob|Rob|Dob|Lob)')]);
  myArticleImage = new FormControl('', Validators.required);
  myFormGroup = new FormGroup({
    headline: this.myHeadline,
    body: this.myBody,
    author: this.myAuthor,
    articleImgurl: this.myArticleImage

  })
  searchTerm: string | undefined;
  pageSize: number | undefined;


  constructor(private http: HttpClient, public service: Myservice) {
    this.getData()

  }


  async getData() {
    const call = this.http.get<Article[]>('http://localhost:5000/api/feed', {params: {limit: 5}});
    const result = await firstValueFrom<Article[]>(call);
    this.service.articles = result;
  }

  deleteItem(article: Article) {
    this.http.delete<Article>('http://localhost:5000/api/articles/' + article.articleId).subscribe(() => {
      this.service.articles = this.service.articles.filter(a => a.articleId != article.articleId);
    })
  }

  async filterArticles() {
      const call = this.http.get<Article[]>('http://localhost:5000/api/articles?searchTerm=' + this.searchTerm + '&pageSize=' + this.pageSize);
      const result = await firstValueFrom<Article[]>(call);
      this.service.articles = result;
  }

}


export interface Article {
  articleId: number
  headline: string
  body: string
  author: string
  articleImgUrl: string
}


@Component({
  template: `
    <ion-card-content>
      <ion-card-subtitle>Something</ion-card-subtitle>
    </ion-card-content>
  `,
  selector: 'comp'
})
export class MyNewComponent {

}
