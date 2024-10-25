import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorMessageAreaComponent} from './error-message-area.component';

describe('ErrorMessageAreaComponent', () => {
  let component: ErrorMessageAreaComponent;
  let fixture: ComponentFixture<ErrorMessageAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
