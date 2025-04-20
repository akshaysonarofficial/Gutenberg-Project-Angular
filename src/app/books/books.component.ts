import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { switchMap, catchError, take } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  category: string = '';
  searchText = '';
  books: any;
  nextUrl: any;
  isLoading: boolean = false;

  constructor(public state: StateService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.state.category$.pipe(
      take(1)
    ).subscribe((category: string) => {
      if (!category) {
        this.router.navigate(['']);
        return;
      }
      this.category = category;
      this.filteredBooks();
    })
    // this.state.category$.pipe(
    //   switchMap((category: string) => {
    //     if (!category) {
    //       this.router.navigate(['']);
    //       return EMPTY
    //     }
    //     this.category = category;
    //     this.isLoading = true
    //     return this.apiService.getBooks(category, '').pipe(
    //       catchError(error => {
    //         console.error('Error fetching books:', error);
    //         this.isLoading = false;
    //         return of({ results: [], next: null });
    //       })
    //     );
    //   })
    // )
    //   .subscribe(data => {
    //     this.books = data.results
    //     this.nextUrl = data.next;
    //     this.isLoading = false;
    //   });
  }
  goBack() {
    this.router.navigate(['/']);
  }
  filteredBooks() {
    // if (!this.searchText) return this.books;
    const lower = this.searchText ? this.searchText.toLowerCase() : '';
    const query = lower ? this.category + ' ' + lower : this.category
    this.isLoading = true;
    this.apiService.getBooks(query, '').subscribe((res: any) => {
      this.books = res.results;
      this.nextUrl = res.next;
      this.isLoading = false
    })
  }
  loadBooks() {
    if (!this.nextUrl || this.isLoading) return;

    this.isLoading = true;
    this.apiService.getBooks(this.category, this.nextUrl).subscribe(data => {
      this.books = [...this.books, ...data.results];
      this.nextUrl = data.next;
      this.isLoading = false;
    });
  }
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    if (scrollTop + winHeight >= docHeight - 100) {
      this.loadBooks();
    }
  }
  clearInput() {
    this.searchText = '';
    this.filteredBooks();
  }
  openBook(book: any) {
    const formats = book.formats;

    const preferredFormat =
    formats['text/html'] ||
    formats['application/pdf'] ||
    formats['text/plain; charset=us-ascii'];

    if (preferredFormat) {
      window.open(preferredFormat, '_blank');
    } else {
      alert('No viewable version available.');
    }
  }

}
