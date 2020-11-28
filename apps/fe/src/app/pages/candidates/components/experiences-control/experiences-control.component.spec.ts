import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesControlComponent } from './experiences-control.component';

describe('ExperiencesControlComponent', () => {
  let component: ExperiencesControlComponent;
  let fixture: ComponentFixture<ExperiencesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
