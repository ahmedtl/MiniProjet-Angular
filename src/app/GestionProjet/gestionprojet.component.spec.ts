import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionprojetComponent } from './gestionprojet.component';

describe('GestionprojetComponent', () => {
  let component: GestionprojetComponent;
  let fixture: ComponentFixture<GestionprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
