import { Directive, Renderer2,OnInit,ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backGroundColor: string = this.defaultColor;
  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) { }


  ngOnInit(){
    this.backGroundColor = this.defaultColor;
   // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','blue');
  }



  @HostListener('mouseenter') mouseover(eventData: Event){
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','blue');
    this.backGroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','transparent');
    this.backGroundColor = this.defaultColor;
  }
}
