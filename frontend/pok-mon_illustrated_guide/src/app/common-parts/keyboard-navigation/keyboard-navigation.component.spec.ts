import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KeyboardNavigationComponent} from './keyboard-navigation.component';

describe('KeyboardNavigationComponent', () => {
  let component: KeyboardNavigationComponent;
  let fixture: ComponentFixture<KeyboardNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
