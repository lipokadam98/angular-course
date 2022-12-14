import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]',
  selector: '.app-servers',
  templateUrl: './servers.component.html',
 /* template:
  `<app-server></app-server>
  <app-server></app-server>`,*/
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = false;
  serverCreationStatus = "No server was created";
  serverName = 'test server';
  servers = ['Testserver','Testserver 2'];
  serverCreated = false;
  constructor() {
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000);
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server was created! Name is: "+this.serverName;
  }

  onUpdateServerName(event: any){
   this.serverName = event.target.value;
  }
}
