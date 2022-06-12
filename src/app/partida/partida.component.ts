import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { faArrowLeft, faArrowRight, faCheck, faCircleUser, faPlus, faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { Partida } from '../Classes/Partida';
import { Jogador } from '../Classes/Jogador';
import { MatDialog } from '@angular/material/dialog';
import { GolpesComponent } from '../golpes/golpes.component';
import { Set } from '../Classes/Set';
import { Jogada } from '../Classes/Jogada';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css', '../app.component.css']
})
export class PartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faCheck = faCheck;
  faCircleUser = faCircleUser;
  faPlus = faPlus;
  faTableTennis = faTableTennis;

  partida: Partida;
  jogadores: Jogador[] = [];
  quadrantes: any[] = [];

  tabIndex = 0;

  sets: any[] = [
    {
      id_set: 0,
      ordem_set: 1
    },
    {
      id_set: 1,
      ordem_set: 2
    },
    {
      id_set: 2,
      ordem_set: 3
    }
  ]

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService, private route: ActivatedRoute, public dialog: MatDialog ) { }

  ngOnInit(): void {
    
    this.getJogadores();
    this.getQuadrantes();

    this.route.params.subscribe(params => {
      this.getPartida(params[`id`]);
    });
    
  }

  public getPartida(idPartida: number){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_partida', {params:{id_partida: idPartida}})
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter a partida. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }

      this.partida = ret.partida_badminton;
      this.iniciaSet();
      
    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter a partida. Tente novamente mais tarde');
      console.log(erro);
    })
  }

  public getJogadores(){
    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter os jogadores. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
      
      this.jogadores = ret.jogadores_badminton;

    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter os jogadores. Tente novamente mais tarde');
      console.log(erro);
    })
  }

  public getQuadrantes(){
    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_quadrantes')
    .subscribe(
    ret => {
      
      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter os quadrantes. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
      
      this.quadrantes = ret.quadrantes;

    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter os quadrantes. Tente novamente mais tarde');
      console.log(erro);
    })
  }

  public postSet(ordem: number){

    this.http.post('https://scoutbadmintonapi.herokuapp.com/post_set', {}, {params: {id_partida: this.partida.id, ordem_set: ordem}})
    .subscribe(
    (ret:any) => {
      
      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter o set. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
      
      this.getPartida(this.partida.id);
      
    },
    erro =>{
      this.toastr.error('Ocorreu um erro ao salvar o set. Tente novamente mais tarde');
      console.log("Erro ao iniciar set", erro);
    })
  }

  public postJogada(jogada: Jogada){
    this.http.post('https://scoutbadmintonapi.herokuapp.com/post_jogada', jogada, {})
    .subscribe(
      (ret: any)=>{

        if (ret.hasOwnProperty('erro')){
          this.toastr.error(ret.erro, 'Ocorreu um erro ao salvar jogada. Tente novamente mais tarde');
          console.log(ret.erro);
          return;
        }
  
        this.partida.sets[this.tabIndex] = ret.pontuacao_set;
        this.toastr.success('Jogada Cadastrada com sucesso', '', {timeOut: 900});
        // console.log(this.partida);

      }, 
      erro =>{
        this.toastr.error('Ocorreu um erro ao salvar jogada. Tente novamente mais tarde');
        console.log(erro);
      }
    )
  }

  public iniciaSet(){
    
    if (this.partida.sets.length == 0){

      this.postSet(1);
      
    }else {

      this.partida.sets.forEach((set: Set, index: number) =>{

        this.sets[index] = set;

        if (set.status == "continuar"){
          this.tabIndex = index;
          // this.selecionaSet(set.ordem_set);
        }
      })
    }
  }

  public abrirModalJogada(quadrante: any){

    const dialogRef = this.dialog.open(GolpesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        let jogada = new Jogada();
        jogada = {
          set: this.sets[this.tabIndex].id_set,
          golpe: result.id,
          quadrante: quadrante.id,
          tipoerro: 0,
          acerto: result.acerto
        }

        this.postJogada(jogada);
      }
    });
  }

  public filtraJogador(jogador: number){
    return this.jogadores.filter(item => item.id == jogador);
  }

  public selecionaSet(set: number){

    let encontrou = false;

    //Verifica se set ja foi criado
    this.partida.sets.forEach((setPartida:Set) => {
      if (setPartida.ordem_set == set){
        encontrou = true;
      }
    })

    if (!encontrou){
      
      this.postSet(set);

    } else {
      
      this.sets.forEach((item:any, index: number)=>{
  
        if (item.ordem_set == set){
          this.tabIndex = index;
        }
  
      })

    }

  }

  goBack() {    
    this._location.back();
  }

}
