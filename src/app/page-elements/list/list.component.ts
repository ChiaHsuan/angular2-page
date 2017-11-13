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
  animate,
  ViewChild } from '@angular/core';
import { DynamicInterfaceComponent } from '../../interface/dynamic.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
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
      }))),
    ])
  ]
})
export class ListComponent implements DynamicInterfaceComponent, OnInit {

  @Input() data: any;
  
  public list;
  public interval;
  public title;
  private animate;

  constructor(){
    this.animate = 'wait';
  }

  ngOnInit() {
    this.list = this.data.data
                  .map(ele => { 
                    return {
                      label: ele[this.data.label],
                      value: ele[this.data.value]
                    };
                  });
    this.title = this.data.title;
  }
 
}