import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../ngrx/app.state';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Task } from 'src/app/tasks/interfaces/tasks.interface';
import * as fromTasksActions from '../../../tasks/tasks-store/actions/tasks.actions';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {

  @Input() tasksCard: Task[] | null = [];
  @Input() isLoadingCard!: boolean | null;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  public editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  public deleteTask(task: Task): void {
    this.store.dispatch(new fromTasksActions.RemoveTask(task.id));
  }
}