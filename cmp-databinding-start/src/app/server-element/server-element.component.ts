import { Component, ContentChild, Input, OnInit, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit ,AfterContentInit{
  @Input('srvElement') element: {type: string; name: string,content:string};
  @ContentChild('contentParagraph') contentParagraph: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.contentParagraph);
  }

}
