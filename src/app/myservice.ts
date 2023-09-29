import {Injectable} from "@angular/core";
import {Article} from "./home/home.page";

@Injectable({
  providedIn: 'root'
})
export class Myservice {
  articles: Article[] = [];
}
