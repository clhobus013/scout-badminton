import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroJogadorComponent } from './cadastro-jogador/cadastro-jogador.component';
import { ListaJogadorComponent } from './lista-jogador/lista-jogador.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-jogador', component: CadastroJogadorComponent },
  { path: 'lista-jogador', component: ListaJogadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
