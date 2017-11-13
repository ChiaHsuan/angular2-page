import { Component, Input, AfterViewInit, OnChanges } from '@angular/core';
import { DynamicInterfaceComponent } from '../../interface/dynamic.interface';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.css']
})
export class SiteInfoComponent implements DynamicInterfaceComponent{

  @Input() data: any;
  title: string;
  label: string;
  value: number;

  ngOnInit() {
    this.value = this.data.jsonArr[0][this.data.value];
    this.title = this.data.title;
    this.label = this.data.label;
  };
}
