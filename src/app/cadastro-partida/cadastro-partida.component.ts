import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../Classes/Jogador';
import { Partida } from '../Classes/Partida';

@Component({
  selector: 'app-cadastro-partida',
  templateUrl: './cadastro-partida.component.html',
  styleUrls: ['./cadastro-partida.component.css', '../app.component.css']
})
export class CadastroPartidaComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;
  faPlay      = faPlay;

  partida: Partida;
  partidas: Partida[] = [];
  jogadores: Jogador[] = [];

  tipos = [ 'Simples', 'Dupla' ];
  modalidades = [ 'Masculino', 'Feminino', 'Misto' ];

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService, private router: Router) {
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

  public adicionaPartida(iniciar: boolean = false){

    if (!this.validaPartida()){
      return false;
    }

    this.http.post<any>('https://scoutbadmintonapi.herokuapp.com/post_partida', this.partida)
    .subscribe(
      resultado => {

        if (resultado.hasOwnProperty('erro')){
          this.toastr.error(resultado.erro, 'Ocorreu um erro ao salvar a partida. Tente novamente mais tarde');
          console.log(resultado.erro);
          return;
        }
        console.log(resultado);
        
        this.partida = new Partida();
        
        if (iniciar){
          this.router.navigate(["partida", resultado.partida.partida_id]);
        } else {
          this.toastr.success('Partida cadastrada com sucesso');
        }
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

    if (!this.partida.nome){
      this.toastr.error('Por favor, adicione um nome v??lido', 'Nome n??o informado');
      return false;
    }

    if (!this.partida.data){
      this.toastr.error('Por favor, adicione uma data v??lida', 'Data n??o informada');
      return false;
    }

    if (!this.partida.tipo_jogo){
      this.toastr.error('Por favor, adicione um tipo de partida v??lida', 'Tipo de partida n??o informada');
      return false;
    }

    if (!this.partida.modalidade){
      this.toastr.error('Por favor, adicione uma modalidade v??lida', 'Modalidade da partida n??o informada');
      return false;
    }

    if (!this.partida.jogador_1){
      this.toastr.error('Por favor, adicione um jogador v??lido', 'Jogador n??o informado');
      return false;
    }

    if (!this.partida.jogador_adversario_1){
      this.toastr.error('Por favor, adicione um jogador advers??rio v??lido', 'Jogador advers??rio n??o informado');
      return false;
    }

    if ( this.partida.jogador_1 == this.partida.jogador_adversario_1 ){
      this.toastr.error('N??o ?? poss??vel selecionar jogadores iguais', 'Selecione outro jogador');
      return false;
    }

    if (this.partida.tipo_jogo == 'dupla'){
      if (!this.partida.jogador_2){
        this.toastr.error('Por favor, adicione um segundo jogador v??lido', 'Segundo jogador n??o informado');
        return false;
      }
  
      if (!this.partida.jogador_adversario_2){
        this.toastr.error('Por favor, adicione um segundo jogador advers??rio v??lido', 'Segundo jogador advers??rio n??o informado');
        return false;
      }

      if ( this.partida.jogador_adversario_1 == this.partida.jogador_adversario_2 ||
        this.partida.jogador_1 == this.partida.jogador_2 ||
        this.partida.jogador_1 == this.partida.jogador_adversario_2 ||
        this.partida.jogador_2 == this.partida.jogador_adversario_1 ||
        this.partida.jogador_2 == this.partida.jogador_adversario_2
      ){
        this.toastr.error('N??o ?? poss??vel selecionar jogadores iguais', 'Selecione outro jogador');
        return false;
      }

    }

    return true;
  }

  goBack() {    
    this._location.back();
  }

}
