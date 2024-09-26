import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Task } from '../../interfaces/tasks.interface';
import { AppState } from 'src/app/shared/ngrx/app.state';
import * as fromTasksActions from '../../tasks-store/actions/tasks.actions';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {

  constructor(
    private store: Store<AppState>
  ) {}

  public saveNewTask(task: Task): void {
    this.store.dispatch(new fromTasksActions.AddTask(task));
  }
}