import { Component,OnInit, OnChanges } from '@angular/core';
import { ComponentDataService } from '../../services/component-data.service';
import { ComponentItem } from '../../schema/component-item';
import { Observable } from 'rxjs';
import * as settings from '../../configs/configs.demo';

@Component({
  selector: 'app-operation',
  templateUrl: './demo.component.html'
})

export class DemoComponent implements OnInit{
  
  leftTopData: Observable<Array<any>>;
  leftBottomData: Observable<Array<any>>;
  rightTopData: Observable<Array<any>>;
  rightBottomData: Observable<Array<any>>;
  middleData: Observable<Array<any>>;
  siteData: Observable<Array<any>>;
  centerTopData: Observable<Array<any>>;
  centerTopData2: Observable<Array<any>>;

  constructor(
      private componentDataService: ComponentDataService,
    ) { }

  ngOnInit() {
    this.leftTopData = this.componentDataService.getComponents(settings.configs.leftTop);    
    this.leftBottomData = this.componentDataService.getComponents(settings.configs.leftBottom);    
    this.rightTopData = this.componentDataService.getComponents(settings.configs.rightTop);    
    this.rightBottomData = this.componentDataService.getComponents(settings.configs.rightBottom);    
    this.middleData = this.componentDataService.getComponents(settings.configs.middle);    

    this.siteData = this.componentDataService.getComponents(settings.configs.siteInfo);
    this.centerTopData = this.componentDataService.getComponents(settings.configs.centerTop);
    this.centerTopData2 = this.componentDataService.getComponents(settings.configs.centerTop2);

  } 

}