import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdapters from '../adapters/task.adapters';
import * as fromActions from '../actions/tasks.actions';
import { TasksState } from '../states/tasks.state';

export const initialState: TasksState = fromAdapters.adapter.getInitialState({
    isLoading: false,
    success: false,
    error: null
});

export function reducer( state = initialState, action: fromActions.TASKS_ACTIONS ): TasksState {
    switch (action.type) {
        case fromActions.TasksActionsTypes.LOAD_TASKS: {
            return { ...state, isLoading: true, success: false, error: null };
        }
        case fromActions.TasksActionsTypes.LOAD_TASKS_SUCCESS: {
            return fromAdapters.adapter.setAll(action.payload, { ...state, isLoading: false, success: true, error: null });
        }
        case fromActions.TasksActionsTypes.ADD_TASK: {
            return { ...state, isLoading: true, success: false, error: null };
        }
        case fromActions.TasksActionsTypes.ADD_TASK_SUCCESS: {
            return fromAdapters.adapter.addOne(action.payload, { ...state, isLoading: false, success: true, error: null });
        }
        case fromActions.TasksActionsTypes.UPDATE_TASK: {
            return { ...state, isLoading: true, success: false, error: null };
        }
        case fromActions.TasksActionsTypes.UPDATE_TASK_SUCCESS: {
            return fromAdapters.adapter.updateOne(action.payload, { ...state, isLoading: false, success: true, error: null });
        }
        case fromActions.TasksActionsTypes.REMOVE_TASK: {
            return { ...state, isLoading: true, success: false, error: null };
        }
        case fromActions.TasksActionsTypes.REMOVE_TASK_SUCCESS: {
            return fromAdapters.adapter.removeOne(action.payload, { ...state, isLoading: false, success: true, error: null });
        }
        case fromActions.TasksActionsTypes.TASK_ERROR: {
            return { ...state, isLoading: false, success: false, error: action.payload.error };
        }
        default: {
            return state;
        }
    }
}

export const getTasksState = createFeatureSelector<TasksState>( 'tasksState' );
export const selectTask = createSelector( getTasksState, fromAdapters.selectTasks );

export const getError = (state: TasksState) => state.error;
export const getSucces = (state: TasksState) => state.success;
export const getIsLoading = (state: TasksState) => state.isLoading;

export const selectTasksError = createSelector(getTasksState, getError);
export const selectTasksSuccess = createSelector(getTasksState, getSucces);
export const selectTasksIsLoading = createSelector(getTasksState, getIsLoading);