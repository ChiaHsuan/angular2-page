import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'logo',
  template: `
        <img class="img" style="cursor: pointer;" src='./assets/images/logo.svg'>
        <div style="width: 100%; text-align: center; cursor: pointer;">Click here to go next page</div>
    `,
    styleUrls: ['./logo.component.css']
  })
export class LogoComponent {
  
  constructor(private http: Http) { }

  private title = "the site title";

  ngOnInit(){
        
  }
}