import { StatusActionType } from "./actions/types/StatusActionType";

export type RequestStatusType = 'loading' | 'idle' | 'succeeded' | 'failed';
const initialState = {
  status: 'loading' as RequestStatusType,
};
type InitialStateType = typeof initialState;
export type ActionsTypeApp = StatusActionType;


export const appReducer = (state: InitialStateType = initialState, action: ActionsTypeApp): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    default:
      return state
  };
};


