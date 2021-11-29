import {RequestStatusType} from "../app-reducers";

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);