
import { User } from '../types/User';
import { LoadUsersRequest, LoadUsersSuccess, LoadUsersError, AppAction } from './types/ActionType';

export const loadUsersRequest = (): LoadUsersRequest => ({
  type: AppAction.loadUsersRequest,
});

export const loadUsersSuccess = (users: User[]): LoadUsersSuccess => ({
  type: AppAction.loadUsersSuccess,
  users,
});

export const loadUsersError = (): LoadUsersError => ({
  type: AppAction.loadUsersError,
});
