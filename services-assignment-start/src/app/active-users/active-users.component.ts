import { UsersService } from './../services/users.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  users: string[] = this.usersService.activeUsers;
  constructor(public usersService: UsersService){}

  onSetToInactive(id: number) {
    this.usersService.onSetToInactive(id);
  }
}
