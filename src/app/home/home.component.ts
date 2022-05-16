import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  faCoffee = faCoffee;

  title = 'scout-badminton';
  jogadores : any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // this.getJogadores();
  }

  ngOnInit(): void {
  }

  // public getJogadores(){

  //   this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
  //   .subscribe(
  //   ret => {

  //     ret.jogadores_badminton.forEach((jogador: Jogador) => {
  //       this.jogadores.push(jogador);
  //     });
      
  //     console.log(this.jogadores);
      
  //   })
  // }

  goToCadastroJogador(){
    this.router.navigate(['/cadastro-jogador']);
  }

}
