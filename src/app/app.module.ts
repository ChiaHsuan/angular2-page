import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DynamicComponent } from './dynamic/dynamic.component';
import { ComponentHostDirective } from './directives/component-host.directive';
import { ComponentDataService } from './services/component-data.service';
import { DataStoreService } from './services/data-store.service';

// page element components
import { LogoComponent } from './page-elements/logo/logo.component';
import { C3Component } from './page-elements/c3/c3.component';
import { IframeComponent } from './page-elements/iframe/iframe.component';
import { NumberBoardComponent } from './page-elements/number-board/number-board.component';
import { ListComponent } from './page-elements/list/list.component';
import { SiteInfoComponent } from './page-elements/site-info/site-info.component';
import { D3Component } from './page-elements/d3/d3.component';

// route setting
import { RouterModule, Routes } from '@angular/router';

// page components
import { DemoComponent } from './page-components/demo/demo.component';
import { DemoComponent2 } from './page-components/demo2/demo2.component';

import { Title }     from '@angular/platform-browser';
import { WordCloudComponent } from './page-elements/word-cloud/word-cloud.component';
import { RadarComponent } from './page-elements/radar/radar.component';

const appRoutes: Routes = [
  { path: 'demo', component: DemoComponent, data: {title: "Page1"} },
  { path: 'demo2', component: DemoComponent2, data: {title: "Page2"} },
  { path: '',
    redirectTo: '/demo',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    C3Component,
    DynamicComponent,
    ComponentHostDirective,
    IframeComponent,
    NumberBoardComponent,
    ListComponent,
    SiteInfoComponent,
    D3Component,
    WordCloudComponent,
    RadarComponent,
    DemoComponent,
    DemoComponent2
    
  ],
  entryComponents: [
    C3Component,
    IframeComponent,
    SiteInfoComponent,
    ListComponent,
    D3Component,
    NumberBoardComponent,
    WordCloudComponent,
    RadarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ComponentDataService,
    Title,
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
