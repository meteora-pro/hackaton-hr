import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedVacancyModalComponent } from './matched-vacancy-modal.component';

describe('MatchedVacancyModalComponent', () => {
  let component: MatchedVacancyModalComponent;
  let fixture: ComponentFixture<MatchedVacancyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedVacancyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedVacancyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
