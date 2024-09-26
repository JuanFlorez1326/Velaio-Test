import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksStoreModule } from './tasks-store/tasks-store.module';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CardTaskComponent } from '../shared/components/card-task/card-task.component';
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
        path: 'edit/:id',
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
    SharedModule,
    CommonModule,
    TasksStoreModule,
    CardTaskComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule {}