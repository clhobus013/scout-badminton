import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPartidaComponent } from './lista-partida.component';

describe('ListaPartidaComponent', () => {
  let component: ListaPartidaComponent;
  let fixture: ComponentFixture<ListaPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPartidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
