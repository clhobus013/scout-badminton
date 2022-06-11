import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faCalendar, faUser, faTableTennis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Partida } from '../Classes/Partida';

@Component({
  selector: 'app-lista-partida',
  templateUrl: './lista-partida.component.html',
  styleUrls: ['./lista-partida.component.css', '../app.component.css']
})
export class ListaPartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;
  faCalendar  = faCalendar;
  faUser      = faUser;
  faTableTennis = faTableTennis;
  faPlay = faPlay;

  carregando = true;

  fimPag = 8;
  inicioPag = 0;

  partidas: Partida[] = [];
  currentItemsToShow: Partida[] = [];

  constructor(private http: HttpClient, private _location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.getPartidas();
  }

  public getPartidas(){

    this.carregando = true;

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_partidas')
    .subscribe(
    ret => {

      ret.partidas_badminton.forEach((partida: Partida) => {
        this.partidas.push(partida);
        this.currentItemsToShow.push(partida);
      });
      
      console.log(this.partidas);

      this.carregando = false;
      // tratar erro
      
    })
  }

  public iniciarPartida(partida: Partida){
    console.log(partida);
    console.log("iniciou!");

    this.router.navigate(["partida", partida.id]);

  }

  onPageChange(event:any) {
    this.inicioPag = event.pageIndex * event.pageSize;
    this.fimPag = this.inicioPag + event.pageSize;
  }

  goBack() {    
    this._location.back();
  }

  goHome() {    
    this.router.navigate(['/home']);
  }

}
  