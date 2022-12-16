import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiontacheComponent } from './gestiontache.component';

describe('GestiontacheComponent', () => {
  let component: GestiontacheComponent;
  let fixture: ComponentFixture<GestiontacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestiontacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiontacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
