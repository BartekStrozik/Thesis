import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalsChangeComponent } from './personals-change.component';

describe('PersonalsChangeComponent', () => {
  let component: PersonalsChangeComponent;
  let fixture: ComponentFixture<PersonalsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalsChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
