import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/tasks.interface';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html'
})
export class ListTasksComponent {
  @Input() tasks!: Task[] | null;
  @Input() isLoading!: boolean | null;

}