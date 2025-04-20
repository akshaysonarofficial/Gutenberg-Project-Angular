import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://gutendex.com/books/';
  constructor(private http: HttpClient) { }

  getBooks(category: string , next:string) {
      return this.http.get<any>(next ? next : this.apiUrl + `?search=${category}`)
  }
}
