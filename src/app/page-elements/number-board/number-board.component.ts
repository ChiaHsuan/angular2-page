import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DynamicInterfaceComponent } from '../../interface/dynamic.interface';

@Component({
  selector: 'app-number-board',
  template: `
    <div class="number-board">
        <div class='number-board-title'>{{infos.title}}</div>
        <div class='number-board-data'>{{infos.num}}{{infos.unit}}</div>
    </div>
  `,
  styleUrls: ['./number-board.component.css']
})
export class NumberBoardComponent implements DynamicInterfaceComponent{

  @Input() data: any;
  private infos;

  constructor() { }

  ngOnInit() {
    this.infos = {
      num: this.data.json[0][this.data.value],
      unit: this.data.unit,
      title: this.data.title
    };
  }

}
