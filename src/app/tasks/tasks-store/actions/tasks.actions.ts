import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Task } from '../../interfaces/tasks.interface';

export enum TasksActionsTypes {
    ADD_TASK = '[Tasks] Add Task',
    ADD_TASK_SUCCESS = '[Tasks] Add Task Success',

    REMOVE_TASK = '[Tasks] Remove Task',
    REMOVE_TASK_SUCCESS = '[Tasks] Remove Task Success',

    UPDATE_TASK = '[Tasks] Update Task',
    UPDATE_TASK_SUCCESS = '[Tasks] Update Task Success',

    LOAD_TASKS = '[Tasks] Load Tasks',
    LOAD_TASKS_SUCCESS = '[Tasks] Load Tasks Success',

    TASK_ERROR = '[Tasks] Error'
}

export class LoadTasks implements Action {
    readonly type = TasksActionsTypes.LOAD_TASKS;
}

export class LoadTasksSuccess implements Action {
    readonly type = TasksActionsTypes.LOAD_TASKS_SUCCESS;
    constructor(public payload: Task[]) {}
}

export class AddTask implements Action {
    readonly type = TasksActionsTypes.ADD_TASK;
    constructor(public payload: Task) {}
}

export class AddTaskSuccess implements Action {
    readonly type = TasksActionsTypes.ADD_TASK_SUCCESS;
    constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
    readonly type = TasksActionsTypes.REMOVE_TASK;
    constructor(public payload: number) {}
}

export class RemoveTaskSuccess implements Action {
    readonly type = TasksActionsTypes.REMOVE_TASK_SUCCESS;
    constructor(public payload: number) {}
}

export class UpdateTask implements Action {
    readonly type = TasksActionsTypes.UPDATE_TASK;
    constructor(public payload: Task) {}
}

export class UpdateTaskSuccess implements Action {
    readonly type = TasksActionsTypes.UPDATE_TASK_SUCCESS;
    constructor(public payload: Update<Task>) {}
}

export class TaskError implements Action {
    readonly type = TasksActionsTypes.TASK_ERROR;
    constructor(public payload: any) {}
}

export type TASKS_ACTIONS = 
    | LoadTasks 
    | LoadTasksSuccess 
    | AddTask 
    | AddTaskSuccess 
    | RemoveTask 
    | RemoveTaskSuccess 
    | UpdateTask 
    | UpdateTaskSuccess 
    | TaskError;