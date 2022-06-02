import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { faCheck, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Golpe } from '../Classes/Golpe';

@Component({
  selector: 'app-golpes',
  templateUrl: './golpes.component.html',
  styleUrls: ['./golpes.component.css', '../app.component.css']
})
export class GolpesComponent implements OnInit {

  faCheck = faCheck;
  faXmark = faXmark;
  faArrowLeft = faArrowLeft;

  golpes: Golpe[] = [];

  constructor(private http: HttpClient, private _location: Location) { }

  ngOnInit(): void {
    this.getGolpes();
  }

  public getGolpes(){

    this.http.get<any>('https://scoutbadmintonapi.herokuapp.com/get_golpes')
    .subscribe(
    ret => {

      ret.golpes_badminton.forEach((golpe: Golpe) => {
        this.golpes.push(golpe);
      });
      
      console.log(this.golpes);

      // Colocar item em ordem alfabetica
      
    })
  }

  filtraGolpe() {
    return this.golpes.filter(item=> item.id != 1 && item.id != 12 )
  }

  goBack() {    
    this._location.back();
  }
}
