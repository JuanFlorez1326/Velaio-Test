import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { TasksEffects } from './effects/tasks.effects';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksStoreModule {}