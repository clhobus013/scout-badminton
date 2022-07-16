import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class Serie {
  name: string;
  value: number;

  constructor(name: string, value: number){
    this.name= name;
    this.value = value;
  }
}

export class Relatorio {
  name: string;
  series: Serie[];

  constructor(name: string, series: Serie[]){
    this.name= name;
    this.series = series;
  }
}

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Jogada';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';
  yScaleMax = 2;

  abaSelecionada:number = 0;
  relatorio :any[] = [];

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    this.atualizaGrafico();
  }

  public tabChanged(event:any){
    this.abaSelecionada = event.index;
  }

  public atualizaGrafico(){

    this.data.relatorio.L_set_resultado[this.abaSelecionada].K_jogadas.forEach((jogada:any) => {

      if (this.yScaleMax <= jogada.E_golpe_acertos){
        this.yScaleMax = jogada.E_golpe_acertos + 1;
      }

      if (this.yScaleMax <= jogada.G_golpe_erros){
        this.yScaleMax = jogada.G_golpe_erros + 1;
      }

      console.log(jogada);

      this.relatorio.push(new Relatorio(jogada.B_golpe, [new Serie('Acerto', jogada.E_golpe_acertos), new Serie('Erro', jogada.G_golpe_erros)]))

    });
    
  }
}
