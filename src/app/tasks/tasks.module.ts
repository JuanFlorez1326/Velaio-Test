import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksPageComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    TasksPageComponent,
    CreateTaskComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule {}