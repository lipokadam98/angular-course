import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data=>{
      this.server = data['server'];
    });
    /*
    this.activatedRoute.params.subscribe((param)=>{
      this.server = this.serversService.getServer(+param['id']);
    });*/
  }

  onEdit(){
      this.router.navigate(['edit'],{relativeTo: this.activatedRoute ,queryParamsHandling: 'preserve'})
  }

}
