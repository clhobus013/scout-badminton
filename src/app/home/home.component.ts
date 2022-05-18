import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToCadastroJogador(){
    this.router.navigate(['/cadastro-jogador']);
  }

  goToListaJogador(){
    this.router.navigate(['/lista-jogador']);
  }

}
