import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroJogadorComponent } from './cadastro-jogador/cadastro-jogador.component';
import { CadastroPartidaComponent } from './cadastro-partida/cadastro-partida.component';
import { ListaJogadorComponent } from './lista-jogador/lista-jogador.component';
import { ListaPartidaComponent } from './lista-partida/lista-partida.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-jogador', component: CadastroJogadorComponent },
  { path: 'cadastro-partida', component: CadastroPartidaComponent },
  { path: 'lista-jogador', component: ListaJogadorComponent },
  { path: 'lista-partida', component: ListaPartidaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
