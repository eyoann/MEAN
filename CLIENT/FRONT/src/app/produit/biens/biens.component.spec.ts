import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensComponent } from './biens.component';

describe('BiensComponent', () => {
  let component: BiensComponent;
  let fixture: ComponentFixture<BiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
