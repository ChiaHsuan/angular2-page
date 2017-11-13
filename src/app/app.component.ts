import { Component,OnInit, OnChanges } from '@angular/core';
import { ComponentDataService } from './services/component-data.service';
import { ComponentItem } from './schema/component-item';
import { Observable } from 'rxjs';
import { Title }     from '@angular/platform-browser';
import { DataStoreService } from './services/data-store.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  
  public constructor(private titleService: Title, private stock: DataStoreService ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle("Demo Site");
  }

  ngOnInit() {
  } 
}