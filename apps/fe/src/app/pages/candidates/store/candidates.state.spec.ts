import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CandidatesState, CandidatesStateModel } from './candidates.state';
import { LoadCandidates } from './candidates.actions';

describe('Candidates store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CandidatesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: CandidatesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new LoadCandidates('item-1'));
    const actual = store.selectSnapshot(CandidatesState.getState);
    expect(actual).toEqual(expected);
  });

});
