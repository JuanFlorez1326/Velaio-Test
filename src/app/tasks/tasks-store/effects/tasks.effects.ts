import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.interface';
import * as fromActions from '../actions/tasks.actions';
import { TaskService } from '../../services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
    
    constructor(
        private actions$: Actions,
        private taskService: TaskService
    ) {}

    addTask$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromActions.TasksActionsTypes.ADD_TASK),
            mergeMap((action: fromActions.AddTask) => {
                return this.taskService.addTask(action.payload).pipe(
                    map((response: Task) => {     
                        return new fromActions.AddTaskSuccess(action.payload);
                    }),
                    catchError((error: any) => {
                        return this.onError(error);
                    })
                );
            })
        );
    });

    loadAllTasks$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromActions.TasksActionsTypes.LOAD_TASKS),
            mergeMap(() => {
                return this.taskService.getTasks().pipe(
                    map((response: Task[]) => {
                        return new fromActions.LoadTasksSuccess(response);
                    }),
                    catchError((error: any) => {
                        return this.onError(error);
                    })
                );
            })
        );
    });

    updateTask$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromActions.TasksActionsTypes.UPDATE_TASK),
            mergeMap((action: fromActions.UpdateTask) => {
                return this.taskService.updateTask(action.payload.id, action.payload).pipe(
                    map((response: Task) => {
                        return new fromActions.UpdateTaskSuccess({ id: action.payload.id, changes: action.payload });
                    }),
                    catchError((error: any) => {
                        return this.onError(error);
                    })
                );
            })
        );
    });

    removeTask$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromActions.TasksActionsTypes.REMOVE_TASK),
            mergeMap((action: fromActions.RemoveTask) => {
                return this.taskService.deleteTask(action.payload).pipe(
                    map((response: any) => {
                        return new fromActions.LoadTasks();
                    }),
                    catchError((error: any) => {
                        return this.onError(error);
                    })
                );
            })
        );
    });

    private onError(error: any): Observable<Action> {
        console.log('ERROR: ', error);
        return of(new fromActions.TaskError({ error }));
    }
}