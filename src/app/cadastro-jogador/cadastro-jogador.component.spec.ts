import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroJogadorComponent } from './cadastro-jogador.component';

describe('CadastroJogadorComponent', () => {
  let component: CadastroJogadorComponent;
  let fixture: ComponentFixture<CadastroJogadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroJogadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
