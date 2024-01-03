import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UtilityState, UtilityStateModel } from './utility.state';

describe('Utility state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([UtilityState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(UtilityState.getState);
        const expected: UtilityStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
