import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Http, URLSearchParams } from '@angular/http';

// for csv parser
import * as d3 from 'd3';

/**
 * The service manages the ajax call
 */
@Injectable()
export class DataStoreService {
    
    constructor(private http: Http){}

    dataStock: Array<any> = [];

    getData(url){

        let find = this.dataStock.findIndex(ele => ele.url == url );

        // url is note existed
        // if(find == -1){
            // create new Subejct and store it to data Stock
            // Subject will notify to children of the data is updated
            let item = new Subject();

            this.dataStock.push({
                url: url,
                response: item
            });

            this.makeHttpRequest(url).subscribe({
                next: (data) => { item.next(data) }
            });

            // get new location in array
            let position = this.dataStock.length - 1;
            return this.dataStock[position].response;

        // }else{
        //     // the url existed
        //     return this.dataStock[find].response;
        // }

    }


    makeHttpRequest(url){
      // regular expression: check it the url contains zeppelin or csv
      let isCSV = /(\.csv)|(zeppelin)/g;

      if(isCSV.test(url)){
          return this.http.get(url)
                  .map(response => d3.csv.parse(response.text()));
      }else{
          return this.http.get(url)
              .map(response => response.json())
      }
  }
}
