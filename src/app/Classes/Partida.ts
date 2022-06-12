import { Set } from "./Set";

export class Partida {
    id: number;
    nome: string;
    data: string;
    tipo_jogo: string;
    modalidade: string;
    jogador_1: {
      id: number;
      nome: string
    };
    jogador_2: {
      id: number;
      nome: string
    };
    jogador_adversario_1: {
      id: number;
      nome: string
    };
    jogador_adversario_2: {
      id: number;
      nome: string
    };
    sets: Set[]

    // constructor(partida_nome: string, data: string, tipo_jogo: string, modalidade: string, jogador_1: string, jogador_adversario_1: string){

    //   this.partida_nome= partida_nome;
    //   this.data = data;
    //   this.tipo_jogo = tipo_jogo;
    //   this.modalidade = modalidade;
    //   this.jogador_1 = jogador_1;
    //   this.jogador_adversario_1 = jogador_adversario_1;

    // }
  }