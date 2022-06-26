import { Component, OnInit, Inject } from '@angular/core';
import { faCheck, faXmark, faArrowLeft, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Global } from '../common/global.component';
import { Golpe } from '../Classes/Golpe';

@Component({
  selector: 'app-golpes',
  templateUrl: './golpes.component.html',
  styleUrls: ['./golpes.component.css', '../app.component.css']
})
export class GolpesComponent implements OnInit {

  faPlus = faPlus;
  faCheck = faCheck;
  faXmark = faXmark;
  faArrowLeft = faArrowLeft;
  faAngleDown = faAngleDown;

  erros: Golpe[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public quadrante: any, private global: Global, public dialogRef: MatDialogRef<GolpesComponent>) { }

  ngOnInit(): void {

    this.erros = this.global.erroSaque;
    console.log(this.quadrante);
    console.log(this.global.golpes);
  }

  filtraGolpe(id: number|null) {
    return !id ? this.global.golpes.filter(item=> item.id != 1 ) : this.global.golpes.filter(item=> item.id == id )
  }

  selecionaJogada(golpe: Golpe, acerto: boolean, tipoErro: Golpe = new Golpe){
    this.dialogRef.close({id: golpe.id, acerto: acerto, tipoErro: tipoErro});
  }

  close() {
    this.dialogRef.close();
  }
}
