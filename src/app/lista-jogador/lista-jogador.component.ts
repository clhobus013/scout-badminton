import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faEnvelope, faCalendar, faMobileScreen, faUser, faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { Jogador } from '../Classes/Jogador';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-jogador',
  templateUrl: './lista-jogador.component.html',
  styleUrls: ['./lista-jogador.component.css', '../app.component.css']
})
export class ListaJogadorComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;
  faEnvelope  = faEnvelope;
  faCalendar  = faCalendar;
  faMobileScreen = faMobileScreen;
  faUser = faUser;
  faTableTennis = faTableTennis;

  carregando = true;

  fimPag = 8;
  inicioPag = 0;

  jogadores: Jogador[] = [];

  constructor(private http: HttpClient, private _location: Location, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getJogadores();
  }

  public getJogadores(){

    this.carregando = true;

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter os jogadores. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
        
      ret.jogadores_badminton.forEach((jogador: Jogador) => {
        this.jogadores.push(jogador);
      });
      
      // console.log(this.jogadores);

      this.carregando = false;

      // Colocar item em ordem alfabetica
      
    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter os jogadores. Tente novamente mais tarde');
      console.log(erro);
    })
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
  