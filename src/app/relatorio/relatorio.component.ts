import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Global } from '../common/global.component';
import { ToastrService } from 'ngx-toastr';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css', '../app.component.css']
})
export class RelatorioComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  carregando = true;
  relatorio: any;

  constructor(private http: HttpClient, private _location: Location, private toastr: ToastrService, private route: ActivatedRoute, private global: Global) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params[`id`]);
      this.getRelatorio(params[`id`]);
    });

  }

  public getRelatorio(idPartida: number){

    this.carregando = true;

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/v3/get_relatoriopartida', {params:{id_partida: idPartida}})
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter o relatório. Tente novamente mais tarde');
        console.log(ret.erro);
        this.carregando = false;
        return;
      }

      this.relatorio = ret.relatorio_partida[0];
      console.log(this.relatorio);
      this.carregando = false;
      
    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter o relatório. Tente novamente mais tarde');
      this.carregando = false;
      console.log(erro);
    })
  }

  public formataData(data: string){
    return this.global.formataData(data);
  }

  goBack() {    
    this._location.back();
  }

}
