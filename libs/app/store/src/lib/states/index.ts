import { State } from '@ngxs/store';
import { DictionaryState } from './dictionary/dictionary.state';
import { UserState } from './user/user.state';
import {UtilityState} from "./utility/utility.state";
import {ListingsState} from "./listings/listings.state";

export const AppStates = [DictionaryState, UserState, UtilityState, ListingsState];

@State({
  name: 'appStateModule',
  children: AppStates
})
export class AppStateModule {}
