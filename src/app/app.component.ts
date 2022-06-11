import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './common/global.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private global: Global) {
    //Busca  golpes apenas quando a página é aberta;
    this.global.getGolpes();
  }

}
