// Implement loading components
import { Component, 
  ViewChild,
  Input, 
  OnInit, 
  AfterViewChecked,
  ComponentFactoryResolver } from '@angular/core';

import { ComponentHostDirective } from '../directives/component-host.directive';
import { ComponentItem } from '../schema/component-item';
import { DynamicInterfaceComponent } from '../interface/dynamic.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dynamic',
  // The template element decorated with the component-host directive 
  // marks where dynamically loaded components will be added.
  template: `
  <div  (mousemove)="stopAnimation()" (mouseout) = "startAnimation()">
    <div class="dynamic-control" [hidden]="controlHidden">
       <span *ngFor="let item of values; let i = index;" (click)="slideTo(i)"></span>
    </div>
    <template component-host></template>
  </div>
  `,
  styleUrls: ['./dynamic.component.css']
})


export class DynamicComponent implements OnInit {

  // dynamic host can get data from componentItem
  // @Input() componentData: ComponentItem[];
  @Input() componentData:  Observable<Array<any>>;
  @Input() duration = 5000;
  @Input() controlHidden = false;
  anyErrors: boolean;
  
  // store incoming data
  private values: Array<any> = []; 
  
  // store new rendered components
  private children: Array<any> = [];

  // timer for animation
  private interval; 

  // record the current showed component
  private currentIndex = 0; 

  // To get access to a component and its methods, use the @ViewChild decorator.
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
      let subscription = this.componentData.subscribe(
          value => {
            // store data
            this.values.push(value); 

            // render component
            this.loadComponent(value);
          },
          error => this.anyErrors = true,
          () => {  }
      );
      
      this.go();
  }
  
  loadComponent(componentItem) {

    let componentFactory = this._componentFactoryResolver
        .resolveComponentFactory(componentItem.component)

    let viewContainerRef = this.componentHost.viewContainerRef;

    let componentRef = viewContainerRef.createComponent(componentFactory);

    this.children.push(componentRef);
  
    // DynamicComponent is an Interface
    (<DynamicInterfaceComponent>componentRef.instance).data = componentItem.data;
  }

  // Start Animation
  go(){
      this.interval = setInterval(()=> {

          let len = this.children.length;
          let nextIndex = 0;

          // scan all children
          // animate flow: wait => in => wait
          this.children.forEach((ele, index)=>{
            if(ele.instance.animate == 'in'){
              this.currentIndex = index;
              nextIndex = ((index+1)==len)? 0: index+1;
            }
          });

          // change animate state
          this.children[this.currentIndex].instance.animate = 'wait';
          this.children[nextIndex].instance.animate = 'in';
          
      }, this.duration); 
  }

  slideTo(index){
    // change animate state of children
    // set all children's state as wait
    this.children.forEach((ele, index)=>{
       ele.instance.animate = 'wait';
    });

    // children[index] animate as in
    this.children[index].instance.animate = 'in';
  }

  stopAnimation(){
    clearInterval(this.interval);
  }


  startAnimation(){
    this.go();
  }
}
