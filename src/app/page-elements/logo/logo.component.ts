import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'logo',
  template: `
      <img style="cursor: pointer;" src='./assets/images/logo.svg' style='height: 70%; display:block; margin: auto; cursor: pointer;'>
      <div style="width: 100%; text-align: center; cursor: pointer;">Click here to go next page</div>
  `
})
export class LogoComponent {
  
  constructor(private http: Http) { }

  private title = "the site title";

  ngOnInit(){
        
  }
}