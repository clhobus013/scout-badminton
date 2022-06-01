import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { HomeComponent } from './home/home.component';
import { CadastroJogadorComponent } from './cadastro-jogador/cadastro-jogador.component';
import { ListaJogadorComponent } from './lista-jogador/lista-jogador.component';
import { CadastroPartidaComponent } from './cadastro-partida/cadastro-partida.component';
import { ListaPartidaComponent } from './lista-partida/lista-partida.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroJogadorComponent,
    ListaJogadorComponent,
    CadastroPartidaComponent,
    ListaPartidaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass :'toast-bottom-right'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
