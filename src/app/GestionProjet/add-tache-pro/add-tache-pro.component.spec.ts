import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTacheProComponent } from './add-tache-pro.component';

describe('AddTacheProComponent', () => {
  let component: AddTacheProComponent;
  let fixture: ComponentFixture<AddTacheProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTacheProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTacheProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
