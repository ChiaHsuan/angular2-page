import { Component,OnInit, OnChanges } from '@angular/core';
import { ComponentDataService } from '../../services/component-data.service';
import { ComponentItem } from '../../schema/component-item';
import { Observable } from 'rxjs';
import * as settings from '../../configs/configs.demo2';

@Component({
  selector: 'app-student',
  templateUrl: './demo2.component.html'
})

export class DemoComponent2 implements OnInit{
  
  leftTopData: Observable<Array<any>>;
  leftBottomData: Observable<Array<any>>;
  rightTopData: Observable<Array<any>>;
  rightBottomData: Observable<Array<any>>;
  middleData: Observable<Array<any>>;
  siteData: Observable<Array<any>>;
  centerTopData: Observable<Array<any>>;
  centerTopData2: Observable<Array<any>>;
  centerTopData3: Observable<Array<any>>;

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
    this.centerTopData3 = this.componentDataService.getComponents(settings.configs.centerTop3);

  } 

}