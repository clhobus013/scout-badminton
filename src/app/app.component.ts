import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  faCoffee = faCoffee;

  title = 'scout-badminton';
  jogadores : any[] = [];

  constructor(private http: HttpClient) {
    this.getJogadores();
  }

  public getJogadores(){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {

      this.jogadores = ret.jogadores_badminton;
      
    })
  }

}
