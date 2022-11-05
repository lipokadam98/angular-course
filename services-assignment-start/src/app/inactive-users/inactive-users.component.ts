import { UsersService } from './../services/users.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[] = this.usersService.inactiveUsers;
  constructor(public usersService: UsersService){}

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }
}
