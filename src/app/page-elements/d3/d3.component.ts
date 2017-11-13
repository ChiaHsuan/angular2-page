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

declare var xy_chart_diffcultity: any;
declare var drawScatter: any;

@Component({
  selector: 'd3-component',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css'],
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

export class D3Component implements DynamicInterfaceComponent, OnInit{
  @Input() data: any;

  private animate;
  private _chart;
  private chartTitle;
  private chartId;

  constructor(
  ){

  }
  ngOnInit(){
    this.animate = 'wait';
    this.chartTitle = this.data.title;
    this.chartId = this.data.id;
  }

  ngAfterViewInit(){
      
      let config;

      switch(this.data.type){
        case 'bubble':
          config = {
              id: this.data.id,
              value : this.data.value,
              label: this.data.label,
              diameter: 500
          };
          this._fiveCircle(this.data.jsonArr, config);
          break;
        case 'progressBar':
          config = {
              id: '#' + this.data.id,
              value : this.data.value,
              label: this.data.label
          };
          this._progressBar(this.data.jsonArr, config);
          break;
        case 'scatterDiff':
          config = {
              id: '#' + this.data.id,
              value : this.data.value,
              label: this.data.label
          };
          this._scatterDiff(this.data.jsonArr, config);
          break;
        case 'scatterDiscrim':
          config = {
              id: '#' + this.data.id,
              value : this.data.value,
              label: this.data.label
          };
          this. _scatterDiscrim(this.data.jsonArr, config);
          break;
        case 'default':
          break;
      }
     
  }
  
  private _fiveCircle(data, config){
      // basic bubble chart reference
      // https://jrue.github.io/coding/2014/exercises/basicbubblepackchart/
      
      let diameter = config.diameter; //max size of the bubbles

      let bubble = d3.layout.pack()
          .sort(null)
          .size([diameter, diameter])
          .padding(1.5);

      let svg = d3.select("#"+config.id)
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", "0 0 " + diameter + " " + diameter)
          .attr("preserveAspectRatio", "xMidYMin meet")
          .attr("class", "bubble");
      
      //convert numerical values from strings to numbers
      data = data.map(function(d){ d.value = +d[config.value]; return d; });
      
      // 只取前五個
      let TopFivedata = data.slice(0,5);
      // bubbles needs very specific format, convert data to this.
      let nodes = bubble.nodes({children:TopFivedata}).filter(function(d) { return !d.children; });

      //setup the chart
      let bubbles = svg.append("g")
          .attr("transform", "translate(0,0)")
          .selectAll(".bubble")
          .data(nodes)
          .enter();

      // color of circles
      let color = ["#59c759","#467be1","#65b9f2","#ffab57","#fb4380"];
      //create the bubbles
      bubbles.append("circle")
          .attr("r", function(d){ return d.r; })
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
          .attr("fill", "none")
          .attr("stroke-width", 3)
          .attr("stroke", function(d,i){ return color[i]; });

      //format the text for each bubble
      bubbles.append("text")
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y + 5; })
          .attr("text-anchor", "middle")
          .text(function(d){ return d[config.label]+ parseInt(d[config.value]) + "%"; })
          .attr({
              "fill": function(d,i){ return color[i]; },
              "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
              "font-size": "2rem"
          });
  }

  private _progressBar(data, config){
    /**
     * data = [
     *    {
     *      Process: 100,
     *      Lesson: 'XXXX'
     *    },
     * ]
     */
    // preprocess of data
    let allLabels = data.map(d => d[config.label]);

    let svgW = 400;
    let svgH = 300;
    let svgLeftMargin = 10;
    // x axis is percent
    let scaleH = d3.scale.linear().domain([0, 100]).range([svgH/2, 0]);

    let container = d3.select(config.id).append("svg")
      .attr({
        width: "100%",
        height: "100%",
        viewBox: "0 0 " + svgW + " " + svgH,
        preserveAspectRatio: "xMidYMin meet"
      })
      .append("g")
      .attr("transform", "translate(" + svgLeftMargin + ",0)");


    // draw half ring chart
    
    let bars = container.selectAll("g")
                .data(data).enter()
                .append("g");

    let barSpace = 10;    
    let barWidth = svgW/2;
    let barHeight = svgH/2 -20;
    let positions = [
      [0, 0],
      [barWidth + barSpace, 0],
      [0, barHeight + barSpace],
      [barWidth + barSpace, barHeight + barSpace]
    ];
    // append progress bar background
    bars.append("rect")
      .attr({
        width: barWidth,
        height: barHeight,
        transform:(d,i) => "translate(" + positions[i]+ ")",
        fill: "#3F51B5"
      });

    // append progress bar
    bars.append("rect")
      .attr({
        width: barWidth,
        height: d => scaleH(d[config.value]),
        transform:(d,i) => "translate(" + positions[i]+ ")",
        fill: "#222222"
      });
    
    // append lable text
    bars.append("text")
      .text(d => d[config.label])
      .attr({
        x: (d,i) => positions[i][0] + 20,
        y: (d,i) => positions[i][1] + 30,
        class: "progress-bar-label",
        fill: "#E8EAF6",
        "text-anchor": "start",
        "font-size": '1.5rem'      
      });

    bars.append("text")
        .text(d => d[config.value] + "%")
        .style("font-size", "3.5rem")
        .attr({
          x: (d,i) => positions[i][0] + 20,
          y: (d,i) => positions[i][1] + 90,
          class: "progress-bar-label",
          fill: "#E8EAF6",
          "text-anchor": "start"        
        });
    
  }
  private _scatterDiff(data, config){
    this._chart = xy_chart_diffcultity(config.id)
            .data(data);
  }

  private _scatterDiscrim(data, config){
    drawScatter(data, config.id);
  }
}