import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../Classes/Jogador';

@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.css', '../app.component.css']
})
export class CadastroJogadorComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck     = faCheck;

  jogador: Jogador;
  jogadores: Jogador[] = [];

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.jogador= new Jogador();

    this.jogador.lateralidade = 'naoinformado';
    this.jogador.foto = '';
  }

  public adicionaJogador(){

    // Validar se cadastro ja existe ?
    // Validar email @ .com ....
    // Adicionar mascara no numero de telefone

    if (!this.validaJogador()){
      return false;
    }

    this.http.post<any>('https://scoutbadmintonapi.herokuapp.com/post_jogador', this.jogador)
    .subscribe(
      resultado => {

        if (resultado.hasOwnProperty('erro')){
          this.toastr.error(resultado.erro, 'Ocorreu um erro ao salvar jogador. Tente novamente mais tarde');
          console.log(resultado.erro);
          return;
        }
        console.log(resultado);
        this.toastr.success('Jogador cadastrado com sucesso');

        this.jogador= new Jogador();

        this.jogador.lateralidade = 'naoinformado';
        this.jogador.foto = '';
      },
      erro => {
        this.toastr.error(erro, 'Ocorreu um erro ao salvar jogador. Tente novamente mais tarde');
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );

  }

  public validaJogador(){

    if (!this.jogador.nome){
      this.toastr.error('Por favor, adicione um nome válido', 'Nome não informado');
      return false;
    }

    if (!this.jogador.email){
      this.toastr.error('Por favor, adicione um email válido', 'E-mail não informado');
      return false;
    }

    if (!this.jogador.telefone){
      this.toastr.error('Por favor, adicione um telefone válido', 'Telefone não informado');
      return false;
    }

    if (!this.jogador.data_nascimento){
      this.toastr.error('Por favor, adicione uma data válida', 'Data de nascimento não informado');
      return false;
    }

    this.jogador.telefone = this.jogador.telefone.toString();

    console.log(this.jogador);

    return true;

  }

  goBack() {    
    this._location.back();
  }

}
