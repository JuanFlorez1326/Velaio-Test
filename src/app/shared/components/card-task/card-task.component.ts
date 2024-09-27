import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../ngrx/app.state';
import { SharedModule } from '../../shared.module';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/tasks/interfaces/tasks.interface';
import * as fromTasksActions from '../../../tasks/tasks-store/actions/tasks.actions';

interface FilterBtn {
  title: string;
  color: string;
  typeBtn: string;
  state: boolean | null;
}

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

  public taskByFilter: Task[] | null = [];
  public filterBtn: FilterBtn[] = [
    {
      title: 'Completed',
      color: 'primary',
      typeBtn: 'raised',
      state: true
    },
    {
      title: 'Pending',
      color: 'primary',
      typeBtn: 'stroked',
      state: false
    },
    {
      title: 'All Tasks',
      color: 'primary',
      typeBtn: 'stroked',
      state: null
    }
  ]

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.filterTasks(null);  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasksCard']) this.taskByFilter = this.tasksCard;
  }

  public filterTasks(state: boolean | null): void {
    if (this.tasksCard) {
      if (state === null) this.taskByFilter = this.tasksCard;
      else this.taskByFilter = this.tasksCard.filter(task => task.state === state);
    }
  }

  public editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  public deleteTask(task: Task): void {
    this.store.dispatch(new fromTasksActions.RemoveTask(task.id));
  }

  public completeTask(task: Task): void {
    this.store.dispatch(new fromTasksActions.UpdateTask({...task, state: true }));
  }

  public uncompleteTask(task: Task): void {
    this.store.dispatch(new fromTasksActions.UpdateTask({...task, state: false }));
  }
}