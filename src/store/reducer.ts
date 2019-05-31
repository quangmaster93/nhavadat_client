import produce from 'immer';
import { ApplicationState, initialState } from './types/StoreState';
import { ApplicationAction, AppAction } from './types/ActionType';

const reducer = (state: ApplicationState = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case AppAction.loadUsersRequest:
      return produce(state, (draft) => {
        draft.loading.users = true;
      });
    case AppAction.loadUsersSuccess:
      return produce(state, (draft) => {
        draft.loading.users = false;
        draft.users = action.users;
      });
    case AppAction.loadUsersError:
      return produce(state, (draft) => {
        draft.loading.users = false;
      });
  }
}

export default reducer;
