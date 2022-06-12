import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { faCheck, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Jogada } from '../Classes/Jogada';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Global } from '../common/global.component';
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

  constructor(private http: HttpClient, private _location: Location, @Inject(MAT_DIALOG_DATA) public quadrante: any, private global: Global, public dialogRef: MatDialogRef<GolpesComponent>) { }

  ngOnInit(): void {
    console.log(this.global.golpes);
  }

  filtraGolpe() {
    return this.global.golpes.filter(item=> item.id != 1 && item.id != 12 )
  }

  selecionaJogada(golpe: Golpe, acerto: boolean){
    this.dialogRef.close({id: golpe.id, acerto: acerto});
  }

  close() {
    this.dialogRef.close();
  }
}
