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

import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'c3-component',
  templateUrl: './c3.component.html',
  styleUrls: ['./c3.component.css'],
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

export class C3Component implements DynamicInterfaceComponent, OnInit{
  @Input() data: any;

  private _chart;
  private animate;
  private chartTitle;

  ngOnInit(){
    this.animate = 'wait';
  }
  ngAfterViewInit() { 
    let configuration = this._mappingC3Config(this.data);
    this.chartTitle = this.data.title;
    this._chart = c3.generate(configuration);
  };

  private _mappingC3Config(data){
      
      let config;
      let formattedData = this._formatC3Data(data.jsonArr, data.legends, data.x, data.y);
      
      switch(data.type){
        case "timeseries":
          config = {
              bindto: '#'+data.id,
              data: {
                  x: 'Date',
                  columns: formattedData,
              },
              axis: {
                  x: {
                      type: 'timeseries',
                      tick: {
                          count: 10,
                          format: '%Y-%m-%d'
                      }
                  },
              },
              point: {
                show: false
              }
          };
          break;
        case "line":
          config = {
            bindto: '#' + data.id,
            data: {
              columns: formattedData
            }
          }
        case "bar":
          config = {
              bindto: '#'+data.id,
              data: {
                  json: data.json,
                  keys: {
                    x: data.x,
                    value: data.y
                  },
                  type: data.type
              },
              axis: {
                x: {
                  type: 'categorized'
                }
              }
          };
          break;
        case "donut":
          let donutData = this._formatDonut(data.jsonArr, data.x, data.y);
          config = {
              bindto: '#'+data.id,
              data: {
                  columns: donutData,
                  type: 'pie'
              }
          };
          break;
        case "bar-line":
          formattedData.push(['個人平均成績', 85,85,85]);
          config = {
			        bindto: '#' + data.id,
              data: {
                x: data.x,
                columns: formattedData,
                type: 'bar',
                types: {
                  '個人平均成績': 'line'
                }
              },
              axis: {
                  x: {
                      type: 'category' // this needed to load string x value
                  }
              }
          };
          break;

        default:
          break;
      }

      return config;
  }


  private _formatC3Data(jsonArr, legends, x, y){
      // data is an json array
      let columns = [];
      
      // y is an array with keynames, e.g. ["ActiveUser", "UnactiveUser"...]
      y.forEach((key, index) => {
          let column = jsonArr.map(ele => ele[key]);
          column.unshift(legends[index]);
          columns.push(column);
      });

      // x is a single key, e.g 'Date'
      let formattedX = jsonArr.map(ele => ele[x]);
      formattedX.unshift(x);
      columns.push(formattedX);
      
      return columns;
  }

  private _formatDonut(jsonArr, x, y){
      // data is an json array
      let columns = [];
      
      // get keys 
      jsonArr.forEach((ele)=>{
        columns.push([ ele[x], ele[y[0]]]);
      });

      return columns;
  }
}