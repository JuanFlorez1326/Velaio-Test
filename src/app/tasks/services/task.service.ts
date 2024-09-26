import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public addTask(task: Task): Observable<any> {
    console.log(task, 'Task for Service');
    const tasks = this.getTasksLocalStorage();
    tasks.push(task);
    this.saveTaskLocalStorage(tasks);
    return of(task);
  }
  
  public getTasks() {
    return of(this.getTasksLocalStorage());
  }
  
  public getTaskById(id: number) {
    const tasks = this.getTasksLocalStorage();
    return tasks.find((task: any) => task.id === id);
  }

  public updateTask( id: number, task: Task) {
    const tasks = this.getTasksLocalStorage();
    const index = tasks.findIndex((task: any) => task.id === id);
    tasks[index] = task;
    this.saveTaskLocalStorage(tasks);
    return of(task);
  }

  public checkCompletedTask(id: number) {
    const tasks = this.getTasksLocalStorage();
    const index = tasks.findIndex((task: any) => task.id === id);
    tasks[index].completed = !tasks[index].completed;
    this.saveTaskLocalStorage(tasks);
  }

  public deleteTask(id: number) {
    const tasks = this.getTasksLocalStorage();
    const index = tasks.findIndex((task: any) => task.id === id);
    tasks.splice(index, 1);
    this.saveTaskLocalStorage(tasks);
    return of(id);
  }

  public getTasksLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  private saveTaskLocalStorage(task: Task) {
    localStorage.setItem('tasks', JSON.stringify(task));
  }

}