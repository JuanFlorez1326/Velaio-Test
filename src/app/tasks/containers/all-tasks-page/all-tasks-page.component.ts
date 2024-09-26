import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Task } from '../../interfaces/tasks.interface';
import { AppState } from 'src/app/shared/ngrx/app.state';
import * as fromActions from '../../tasks-store/actions/tasks.actions';
import * as fromReducers from '../../tasks-store/reducers/tasks.reducers';

@Component({
  selector: 'app-all-tasks-page',
  templateUrl: './all-tasks-page.component.html'
})
export class AllTasksPageComponent {

  public tasks$!: Observable<Task[]>;
  public isLoading$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromActions.LoadTasks());
    this.tasks$ = this.store.select(fromReducers.selectTask);
    this.isLoading$ = this.store.select(fromReducers.selectTasksIsLoading);
  }
}