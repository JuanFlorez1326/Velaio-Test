import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Task } from 'src/app/tasks/interfaces/tasks.interface';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  public editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  public deleteTask(task: Task): void {
    console.log('Delete task', task);
  }
}