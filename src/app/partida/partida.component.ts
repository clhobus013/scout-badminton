import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faCircleUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Partida } from '../Classes/Partida';
import { Jogador } from '../Classes/Jogador';
import {MatDialog} from '@angular/material/dialog';
import { GolpesComponent } from '../golpes/golpes.component';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css', '../app.component.css']
})
export class PartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faCircleUser = faCircleUser;
  faPlus = faPlus;

  partida: Partida;
  jogadores: Jogador[] = [];
  quadrantes: any[] = [];

  sets: any[] = [
    {
      id: 0,
      ordem: 1,
      selecionado: true
    },
    {
      id: 1,
      ordem: 2,
      selecionado: false
    },
    {
      id: 2,
      ordem: 3,
      selecionado: false
    }
  ]

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog ) { }

  ngOnInit(): void {
    
    this.getJogadores();
    this.getQuadrantes();

    this.route.params.subscribe(params => {
      console.log('The id of this route is: ', params[`id`]);
      
      this.getPartida(params[`id`]);
      
    });

    
  }

  public getPartida(idPartida: number){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_partida', {params:{id_partida: idPartida}})
    .subscribe(
    ret => {

      this.partida = ret.partida_badminton;
      
      // this.getJogador(this.partida.jogador_1);
      // this.getJogador(this.partida.jogador_adversario_1);

      // if (this.partida.jogador_2){
      //   this.getJogador(this.partida.jogador_2);
      //   this.getJogador(this.partida.jogador_adversario_2);
      // }

      console.log(this.partida);
      // console.log(this.jogadores);
      
    })
  }

  public getJogadores(){
    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {
      // TRATAR ERRO
      console.log(ret.jogadores_badminton);
      this.jogadores = ret.jogadores_badminton;
    })
  }

  public getQuadrantes(){
    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_quadrantes')
    .subscribe(
    ret => {
      // TRATAR ERRO
      console.log(ret.quadrantes);
      this.quadrantes = ret.quadrantes;
    })
  }

  public abrirModalJogada(quadrante: any){

    const dialogRef = this.dialog.open(GolpesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public filtraJogador(jogador: number){
    return this.jogadores.filter(item => item.id == jogador);
  }

  public selecionaSet(set: number){
    this.sets.forEach((item:any)=>{
      item.id == set ? item.selecionao = true : item.selecionado = false;
    })
  }

  goBack() {    
    this._location.back();
  }

}
