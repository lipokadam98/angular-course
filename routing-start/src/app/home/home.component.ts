import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }

  loadServer(id: number){
    //complex calculation
    this.router.navigate(['servers',id,'edit'],{queryParams: {id: 12345},fragment: 'asdasdasdsa'},);
  }

  onLogin(){
    this.authService.login();
  }

  onLogout(){
    this.authService.logout();
  }
}
