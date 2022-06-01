import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Jogador } from '../Classes/Jogador';
import { Partida } from '../Classes/Partida';

@Component({
  selector: 'app-lista-partida',
  templateUrl: './lista-partida.component.html',
  styleUrls: ['./lista-partida.component.css', '../app.component.css']
})
export class ListaPartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;

  partidas: Partida[] = [];
  jogadores: Jogador[] = [];

  constructor(private http: HttpClient, private _location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.getJogadores();
    this.getPartidas();
  }

  public getJogadores(){
    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {
      
      ret.jogadores_badminton.forEach((jogador: Jogador) => {
        this.jogadores.push(jogador);
      });
      
    })
  }

  public getPartidas(){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_partidas')
    .subscribe(
    ret => {

      ret.partidas_badminton.forEach((partida: Partida) => {

        this.partidas.push(partida);
      });
      
      console.log(this.partidas);

      // Colocar item em ordem alfabetica
      
    })
  }

  public getJogador(jogador: number){
    return this.jogadores.filter(item => item.id == jogador);
  }

  goBack() {    
    this._location.back();
  }

  goHome() {    
    this.router.navigate(['/home']);
  }

}
  