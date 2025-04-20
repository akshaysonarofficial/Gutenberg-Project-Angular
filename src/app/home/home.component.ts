import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books = []
  constructor(public state: StateService, private router: Router) { }

  ngOnInit(): void {
  }

  categories = [
    { label: 'Fiction', icon: 'Fiction.svg' },
    { label: 'Drama', icon: 'Drama.svg' },
    { label: 'Humour', icon: 'Humour.svg' },
    { label: 'Politics', icon: 'Politics.svg' },
    { label: 'Philosophy', icon: 'Philosophy.svg' },
    { label: 'History', icon: 'History.svg' },
    { label: 'Adventure', icon: 'Adventure.svg' },
  ];

  getBooksByCategory(category: string) {
    this.state.setCategory(category);
    this.router.navigate([`books`])
  }

}
