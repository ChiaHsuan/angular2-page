/**
 * Where to load the dynamic component ??
  Before components can be added we have to define an anchor point to mark where components 
  can be inserted dynamically.
  The dynamic component uses a helper directive called component-host to mark 
  valid insertion points in the template
 */

import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[component-host]'
})
export class ComponentHostDirective {

  // ViewContainerRef: Represents a container where one or more Views can be attached.
  constructor(
    public viewContainerRef: ViewContainerRef
    ) { }

}
