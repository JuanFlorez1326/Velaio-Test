import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../ngrx/app.state';
import { SharedModule } from '../../shared.module';
import { FilterComponent } from '../filter/filter.component';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/tasks/interfaces/tasks.interface';
import * as fromTasksActions from '../../../tasks/tasks-store/actions/tasks.actions';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    FilterComponent
  ],
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {

  @Input() tasksCard: Task[] | null = [];
  @Input() isLoadingCard!: boolean | null;

  public taskByFilter: Task[] | null = [];
  public currentFilter: string = 'all';

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.filterTasks('all');  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasksCard']) this.taskByFilter = this.tasksCard; 
  }

  public filterTasks(state: string): void {    
    if (this.tasksCard) {
      switch (state) {
        case 'completed':
          this.taskByFilter = this.tasksCard.filter(task => task.state === true);
          break;
        case 'pending':
          this.taskByFilter = this.tasksCard.filter(task => task.state === false);
          break;
        case 'all':
          this.taskByFilter = this.tasksCard;
          break
      }
      this.currentFilter = state;
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