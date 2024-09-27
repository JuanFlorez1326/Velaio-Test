import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface FilterBtn {
  title: string;
  color: string;
  typeBtn: string;
  state: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() tasksCount: number = 0;
  @Input() currentFilter: string = 'all';
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  public filterBtn: FilterBtn[] = [
    {
      title: 'Completed',
      color: 'primary',
      typeBtn: 'raised',
      state: 'completed'
    },
    {
      title: 'Pending',
      color: 'primary',
      typeBtn: 'stroked',
      state: 'pending'
    },
    {
      title: 'All Tasks',
      color: 'primary',
      typeBtn: 'stroked',
      state: 'all'
    }
  ]

  public onFilterChange(state: string): void {
    this.filterChange.emit(state);
  }
}
