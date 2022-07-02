import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  faTableTennis = faTableTennis;

  title = 'scout-badminton';
  jogadores : any[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
