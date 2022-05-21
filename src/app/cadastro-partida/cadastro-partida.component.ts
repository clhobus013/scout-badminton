import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../Classes/Jogador';

class Partida {
  // Se usar em mais lugares, criar arquivo p classe;
  partida_nome: string;
  data: string;
  tipo_jogo: string;
  modalidade: string;
  jogador_1: string;
  jogador_2: string;
  jogador_adversario_1: string;
  jogador_adversario_2: string;
}

@Component({
  selector: 'app-cadastro-partida',
  templateUrl: './cadastro-partida.component.html',
  styleUrls: ['./cadastro-partida.component.css', '../app.component.css']
})
export class CadastroPartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;

  partida: Partida;
  partidas: Partida[] = [];
  jogadores: Jogador[] = [];

  tipos = [ 'Simples', 'Dupla' ];
  modalidades = [ 'Masculina', 'Feminina', 'Misto' ];

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.partida = new Partida();
    this.getJogadores();
  }

  public getJogadores(){
    // Criar um servico para usar mesma funcao que na lista de jogadores

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_jogadores')
    .subscribe(
    ret => {

      ret.jogadores_badminton.forEach((jogador: Jogador) => {
        this.jogadores.push(jogador);
      });
      
      console.log(this.jogadores);

      // Colocar item em ordem alfabetica
      // Falta testar
      
    })
  }

  public adicionaPartida(){

    if (!this.validaPartida()){
      return false;
    }

    console.log("Entrou");

    this.http.post<any>('https://scoutbadmintonapi.herokuapp.com/post_partida', this.partida)
    .subscribe(
      resultado => {

        if (resultado.hasOwnProperty('erro')){
          this.toastr.error(resultado.erro, 'Ocorreu um erro ao salvar a partida. Tente novamente mais tarde');
          console.log(resultado.erro);
          return;
        }
        console.log(resultado);
        this.toastr.success('Partida cadastrada com sucesso');
      },
      erro => {
        this.toastr.error(erro, 'Ocorreu um erro ao salvar a partida. Tente novamente mais tarde');
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );

  }

  public validaPartida(){

    if (!this.partida.partida_nome){
      this.toastr.error('Por favor, adicione um nome válido', 'Nome não informado');
      return false;
    }

    if (!this.partida.data){
      this.toastr.error('Por favor, adicione uma data válida', 'Data não informada');
      return false;
    }

    if (!this.partida.tipo_jogo){
      this.toastr.error('Por favor, adicione um tipo de partida válida', 'Tipo de partida não informada');
      return false;
    }

    if (!this.partida.modalidade){
      this.toastr.error('Por favor, adicione uma data válida', 'Data de nascimento não informado');
      return false;
    }

    if (!this.partida.jogador_1){
      this.toastr.error('Por favor, adicione um jogador válido', 'Jogador não informado');
      return false;
    }

    if (!this.partida.jogador_adversario_1){
      this.toastr.error('Por favor, adicione um jogador adversário válido', 'Jogador adversário não informado');
      return false;
    }

    if (this.partida.tipo_jogo == 'duplo'){
      if (!this.partida.jogador_2){
        this.toastr.error('Por favor, adicione um segundo jogador válido', 'Segundo jogador não informado');
        return false;
      }
  
      if (!this.partida.jogador_adversario_2){
        this.toastr.error('Por favor, adicione um segundo jogador adversário válido', 'Segundo jogador adversário não informado');
        return false;
      }
    }

    // VALIDAR PARA NAO SELECIONAR O MESMO JOGADOR 

    console.log(this.partida);

    return true;

  }

  goBack() {    
    this._location.back();
  }

}
