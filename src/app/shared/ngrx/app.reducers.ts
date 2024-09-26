import { AppState } from './app.state';
import { ActionReducerMap } from '@ngrx/store';
import * as taskReducers from '../../tasks/tasks-store/reducers/tasks.reducers';

export const reducers: ActionReducerMap<AppState, any> = {
    tasksState: taskReducers.reducer
}