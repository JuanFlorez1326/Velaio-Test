import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Task } from '../../interfaces/tasks.interface';

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
    selectId: x => x.id
});

export const {
    selectAll: selectTasks
} = adapter.getSelectors();