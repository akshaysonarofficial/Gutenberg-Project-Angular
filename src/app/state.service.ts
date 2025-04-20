import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private categorySubject = new BehaviorSubject<string>('');
  category$ = this.categorySubject.asObservable();
  constructor() { }

  setCategory(category:string){
    this.categorySubject.next(category)
  }

}
