import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faCircleUser, faPlus } from '@fortawesome/free-solid-svg-icons';
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
  faCheck = faCheck;
  faCircleUser = faCircleUser;
  faPlus = faPlus;

  partida: Partida;
  jogadores: Jogador[] = [];
  quadrantes: any[] = [];

  tabIndex = 0;

  sets: any[] = [
    {
      set_id: 0,
      ordem_set: 1
    },
    {
      set_id: 1,
      ordem_set: 2
    },
    {
      set_id: 2,
      ordem_set: 3
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

      this.iniciaSet();

      console.log(this.partida);
      
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

  public postSet(ordem: number){

    this.http.post('https://scoutbadmintonapi.herokuapp.com/post_set', {}, {params: {id_partida: this.partida.id, ordem_set: ordem}})
    .subscribe(
    (ret:any) => {

      this.getPartida(this.partida.id);

      // console.log(ret);
      // this.sets[ordem-1].set_id = ret.set_criado.set_id;

      // console.log(this.sets);
      // console.log(this.partida.sets);

      // this.partida.sets.push({acertos: 0, erros: 0, id_set:ret.set_criado.set_id, ordem_set: ret.set_criado.ordem_set, resultado_set: 'empate', status: 'continuar'});

      // this.sets[ordem-1] = this.partida.sets[ordem-1];

      console.log(this.sets);
      console.log(this.partida.sets);
      
    },
    erro =>{
      //tratar erro p/ usuario
      console.log("Erro ao iniciar set", erro);
    })
  }

  public postJogada(jogada: Jogada){
    console.log(jogada);
    console.log(JSON.stringify(jogada));
    this.http.post('https://scoutbadmintonapi.herokuapp.com/post_jogada', JSON.stringify(jogada), {})
    .subscribe(
      ret=>{
        console.log(ret);
      }, 
      erro =>{
        //tratar mensagem usuario;
        console.log("Erro ao salvar jogada ");
        console.log(erro);
      }
    )
  }

  public iniciaSet(){
    console.log("Inicia Set");
    
    if (this.partida.sets.length == 0){

      this.postSet(1);
      
    }else {

      this.partida.sets.forEach((set: Set, index: number) =>{

        this.sets[index] = set;

        if (set.status == "continuar"){
          this.tabIndex = index;
          // this.selecionaSet(set.ordem_set);
        }
        // else nao ha sets em aberto
      })

      console.log(this.sets);
    }
  }

  public abrirModalJogada(quadrante: any){

    const dialogRef = this.dialog.open(GolpesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        let jogada = new Jogada();
        jogada = {
          set: this.sets[this.tabIndex].set_id,
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
