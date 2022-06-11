import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { GolpesComponent } from './golpes/golpes.component';
import { PartidaComponent } from './partida/partida.component';
import { Global } from './common/global.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroJogadorComponent,
    ListaJogadorComponent,
    CadastroPartidaComponent,
    ListaPartidaComponent,
    GolpesComponent,
    PartidaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({positionClass :'toast-bottom-right'}),
  ],
  providers: [Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
