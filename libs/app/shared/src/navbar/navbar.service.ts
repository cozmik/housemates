import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  static darkBackground = new BehaviorSubject<boolean>(false);
  constructor() { }
}
