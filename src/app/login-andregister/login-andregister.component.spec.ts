import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginANDregisterComponent } from './login-andregister.component';

describe('LoginANDregisterComponent', () => {
  let component: LoginANDregisterComponent;
  let fixture: ComponentFixture<LoginANDregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginANDregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginANDregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
