import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPartidaComponent } from './cadastro-partida.component';

describe('CadastroPartidaComponent', () => {
  let component: CadastroPartidaComponent;
  let fixture: ComponentFixture<CadastroPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPartidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
