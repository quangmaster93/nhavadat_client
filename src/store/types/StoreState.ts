import { LoadingState } from "../../types/LoadingState";
import { User } from "../../types/User";

export interface ApplicationState {
    loading: LoadingState;
    users: User[];
  }

export const initialState: ApplicationState = {
    loading: {
      users: false,
    },
    users: [],
  }
