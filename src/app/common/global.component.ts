import { HttpClient } from "@angular/common/http";
import { Golpe } from "../Classes/Golpe";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Global {

  golpes: Golpe[] = [];
  erroSaque: Golpe[] = [];

  constructor(private http: HttpClient) { }

  public getGolpes(){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_golpes')
    .subscribe(
    ret => {

      ret.golpes_badminton.golpes.forEach((golpe: Golpe) => {
        this.golpes.push(golpe);
      });

      ret.golpes_badminton.tipo_erros.forEach((erro: Golpe)=>{
        this.erroSaque.push(erro);
      })

      console.log(this.erroSaque);
      
    })
  }

}
