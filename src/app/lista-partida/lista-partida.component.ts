import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../common/global.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faCalendar, faUser, faTableTennis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Partida } from '../Classes/Partida';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, private _location: Location, private router: Router, private toastr: ToastrService, private global: Global) {
  }

  ngOnInit(): void {
    this.getPartidas();
  }

  public getPartidas(){

    this.carregando = true;

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_partidas')
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter as partidas. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
        
      ret.partidas_badminton.forEach((partida: Partida) => {

        partida.data = this.global.formataData(partida.data);
        this.partidas.push(partida);
        this.currentItemsToShow.push(partida);

      });
      
      console.log(this.partidas);
      this.carregando = false;
      
    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter as partidas. Tente novamente mais tarde');
      console.log(erro);
    })
  }

  public iniciarPartida(partida: Partida){
    
    console.log(partida);
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
  