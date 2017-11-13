import { Component, 
  OnInit, 
  AfterViewInit,
  Input,
  trigger,
  state,
  style,
  transition,
  EventEmitter, 
  Output,
  animate  } from '@angular/core';
import { DynamicInterfaceComponent } from '../../interface/dynamic.interface';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'iframe-component',
  template: `
    <div class="child big-card-wrapper" [@flyInOut]="animate">
        <h3 class="big-card-title">{{ title }}</h3>
        <iframe class="big-card-content"
          [src]="trustedMapUrl" 
          frameborder="0">
        </iframe>
    </div>
  `,
  styleUrls: ['./iframe.component.css'],
  animations: [
    trigger('flyInOut', [
      state('wait', style({
        transform: 'translateX(100%)'
      })),
      state('in', style({
        transform: 'translateX(0)'
      })),
      transition('wait => in', animate('500ms ease-out')),
      transition('in => *', animate('500ms ease-out', style({
        transform: 'translateX(-100%)'
      })))
    ])
  ]
})
export class IframeComponent implements DynamicInterfaceComponent, OnInit, AfterViewInit{
  @Input() data: any;
  trustedMapUrl : SafeResourceUrl;
  private animate;
  public title;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(){
      this.animate = 'wait';
      
  }
  ngAfterViewInit(){
    this.trustedMapUrl = 
        this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
      this.title = this.data.title;
  }
}
