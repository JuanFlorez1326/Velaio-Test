import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AllTasksPageComponent } from './containers/all-tasks-page/all-tasks-page.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: 'create',
        component: TasksPageComponent
      },
      {
        path: 'list',
        component: AllTasksPageComponent
      },
      {
        path: '**',
        redirectTo: 'create',
      }
    ]
  }
];

@NgModule({
  declarations: [
    TasksComponent,
    TasksPageComponent,
    ListTasksComponent,
    CreateTaskComponent,
    AllTasksPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule {}