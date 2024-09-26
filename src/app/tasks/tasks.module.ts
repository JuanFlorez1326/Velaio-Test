import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AllTasksPageComponent } from './containers/all-tasks-page/all-tasks-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksStoreModule } from './tasks-store/tasks-store.module';
import { CardTaskComponent } from '../shared/components/card-task/card-task.component';

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