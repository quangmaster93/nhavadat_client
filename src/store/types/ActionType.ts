import { Action } from 'redux';
import { User } from '../../types/User';

// type
export enum AppAction {
    loadUsersRequest= "loadUsersRequest",
    loadUsersSuccess= "loadUsersSuccess",
    loadUsersError= "loadUsersError",
}
// action
export interface LoadUsersRequest extends Action {
  type: AppAction.loadUsersRequest;
}

export interface LoadUsersSuccess extends Action {
  type: AppAction.loadUsersSuccess;
  users: User[];
}

export interface LoadUsersError extends Action {
  type: AppAction.loadUsersError;
}

export type ApplicationAction =
  | LoadUsersRequest
  | LoadUsersSuccess
  | LoadUsersError;
