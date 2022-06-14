import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Golpe } from "../Classes/Golpe";

@Injectable({
    providedIn: 'root',
})

export class Global {

  golpes: Golpe[] = [];
  erroSaque: Golpe[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public getGolpes(){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_golpes')
    .subscribe(
    ret => {

      if (ret.hasOwnProperty('erro')){
        this.toastr.error(ret.erro, 'Ocorreu um erro ao obter os golpes. Tente novamente mais tarde');
        console.log(ret.erro);
        return;
      }
        
      ret.golpes_badminton.golpes.forEach((golpe: Golpe) => {
        this.golpes.push(golpe);
      });

      ret.golpes_badminton.tipo_erros.forEach((erro: Golpe)=>{
        this.erroSaque.push(erro);
      })

      // console.log(this.erroSaque);
      
    },
    erro => {
      this.toastr.error('Ocorreu um erro ao obter os golpes. Tente novamente mais tarde');
      console.log(erro);
    })
  }

  public formataData(data: string): string{

    let vData: string[] = data.split("-");
    let novaData = new Date(parseInt(vData[2]), parseInt(vData[1]), parseInt(vData[0]));

    return novaData.toLocaleDateString();
  }

}
