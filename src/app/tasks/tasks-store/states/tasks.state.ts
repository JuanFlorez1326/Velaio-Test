import { EntityState } from "@ngrx/entity";
import { Task } from "../../interfaces/tasks.interface";

export interface TasksState extends EntityState<Task> {
    isLoading: boolean;
    success: boolean;
    error: any;
}