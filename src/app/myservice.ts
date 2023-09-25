import {Injectable} from "@angular/core";
import {Product} from "./home/home.page";

@Injectable({
  providedIn: 'root'
})
export class Myservice {
  products: Product[] = [];
}
