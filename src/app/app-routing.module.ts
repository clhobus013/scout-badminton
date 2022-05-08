import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroJogadorComponent } from './cadastro-jogador/cadastro-jogador.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-jogador', component: CadastroJogadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
