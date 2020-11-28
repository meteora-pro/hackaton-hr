import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateScoringListComponent } from './candidate-scoring-list.component';

describe('CandidateScoringListComponent', () => {
  let component: CandidateScoringListComponent;
  let fixture: ComponentFixture<CandidateScoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateScoringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateScoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
