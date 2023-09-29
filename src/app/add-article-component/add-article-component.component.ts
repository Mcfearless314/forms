import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Myservice} from "../myservice";
import {firstValueFrom} from "rxjs";
import {Article} from "../home/home.page";

@Component({
  selector: 'app-add-article-component',
  template: `
    <ion-content>

      <ion-item>
        <ion-input [formControl]="myHeadline" placeholder="Headline"></ion-input>


      </ion-item>
      <ion-item>
        <ion-input [formControl]="myBody" placeholder="Body"></ion-input>

      </ion-item>
      <ion-item>
        <ion-input [formControl]="myAuthor" placeholder="Author"></ion-input>

      </ion-item>
      <ion-item>
        <ion-input [formControl]="myArticleImage" placeholder="Article Image"></ion-input>

      </ion-item>
      <ion-button (click)="printTheVariable()" routerLink="/..">Add Article</ion-button>

    </ion-content>
  `,
  styleUrls: ['./add-article-component.component.scss'],
})
export class AddArticleComponentComponent{
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


  constructor(private http: HttpClient, public service: Myservice) {

  }



  async printTheVariable() {
    const call = this.http.post<Article>('http://localhost:5000/api/articles', this.myFormGroup.value)
    const result = await firstValueFrom<Article>(call)
    this.service.articles.push(result);
  }

}
