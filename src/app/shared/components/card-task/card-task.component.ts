import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Task } from 'src/app/tasks/interfaces/tasks.interface';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasksCard']) {
      console.log(changes['tasksCard'].currentValue);
    }
  }

  public editTask(task: Task): void {
    console.log('Edit task', task);
  }

  public deleteTask(task: Task): void {
    console.log('Delete task', task);
  }
}