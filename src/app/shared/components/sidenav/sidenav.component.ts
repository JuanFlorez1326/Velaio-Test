import { Component } from '@angular/core';
import { CustomRoutes } from '../../interfaces/routes.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  public sidenavOptions: CustomRoutes[] = [
    {
      name: 'Create tasks',
      route: 'tasks/create',
      icon: 'fas fa-plus'
    },
    {
      name: 'Lists tasks',
      route: 'tasks/list',
      icon: 'fas fa-tasks'
    }
  ];
}