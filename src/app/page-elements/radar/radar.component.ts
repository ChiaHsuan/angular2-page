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
declare var RadarChart:any;

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css'],
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
export class RadarComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  private animate;

  constructor() { }

  ngOnInit() {
    this.animate = 'wait';
  }
  ngAfterViewInit(){
    this.radar("#" + this.data.id);
  }

  radar(id){

      let radarData = this.dataProprocessor(this.data.jsonArr, this.data.label, this.data.value);

			let color = d3.scale.ordinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);
				
			let radarChartOptions = {
			  maxValue: 1,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};

			//Call function to draw the Radar chart
      // Radar function is included in index.html
			RadarChart(id, radarData, radarChartOptions);
  }

  dataProprocessor(data, label, value){
    let formattedData = data.map(ele => {
      return {
        axis: ele[label],
        value: parseFloat(ele[value])
      }
    });

    return [formattedData];
  }
}
