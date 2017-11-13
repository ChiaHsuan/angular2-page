import { Component, 
  OnInit, 
  AfterViewInit,
  Input,
  trigger,
  state,
  style,
  transition,
  Output,
  ElementRef,
  animate  } from '@angular/core';
import { DynamicInterfaceComponent } from '../../interface/dynamic.interface';

import * as d3 from 'd3';
declare var WordCloud:any;

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css'],
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


export class WordCloudComponent implements OnInit, AfterViewInit,  DynamicInterfaceComponent {

  @Input() data: any;
  private animate;

  ngOnInit() {
    this.animate = 'wait';
  }
  ngAfterViewInit(){
      // format data
      let list = this.data.json.map(ele => [ ele[this.data.label], ele[this.data.value]]);
      WordCloud(document.getElementById(this.data.id), {list: list});
  }
}
