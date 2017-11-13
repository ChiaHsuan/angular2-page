import { Injectable }    from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Type } from '@angular/core';

// Observable
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs';

// Class Component
import { ComponentItem } from '../schema/component-item';

// data service
import { DataStoreService } from './data-store.service';

// Page Elements
import { C3Component }   from '../page-elements/c3/c3.component';
import { ListComponent } from '../page-elements/list/list.component';
import { SiteInfoComponent } from '../page-elements/site-info/site-info.component'
import { IframeComponent } from '../page-elements/iframe/iframe.component';
import { NumberBoardComponent } from '../page-elements/number-board/number-board.component';
import { D3Component } from '../page-elements/d3/d3.component';
import { WordCloudComponent } from '../page-elements/word-cloud/word-cloud.component';
import { RadarComponent } from '../page-elements/radar/radar.component';


// for csv parser
import * as d3 from 'd3';

@Injectable()
export class ComponentDataService {

    private _data; 
    idStore = []; // 存放自動產生的id

    constructor(
        private stock: DataStoreService
    ){}

    getComponents(configs): Observable<Array<any>> {    
        this._data = new Observable(obs => {
            // load the configuration for each position of layout
            // e.g. left-top, center-top, right-top
            configs.forEach(positionConfig => {
                this.processingObserver(obs, positionConfig);
            });
        });
        return this._data;
    }

    processingObserver(observer, ele){
        // get data from getData service
        this.stock.getData(ele.url).subscribe(
            // success 
            d => {
                // if user specific the re-formatted function, format the data
                if(ele.preprocess){
                    d = ele.callback(d);
                };
                let mappedComponent = this.mappingComponent(ele, d);
                observer.next(mappedComponent);
            }
        )
    }

    mappingComponent(ele, d){
        let component = undefined;
        /**
         * forEach may not be a good way..... 
         * and how to send finish signal to app component???
        */
        switch(ele.type){ 
            case 'iframe':
                component = new ComponentItem(
                    IframeComponent, {
                        url: ele.url,
                        title: ele.title
                    }   
                );
                break;
            case 'site-info':
                component = new ComponentItem(
                    SiteInfoComponent, {
                        jsonArr: d,
                        title: ele.title,
                        label: ele.label,
                        value: ele.value
                    }
                );
                break;
            case 'list':
                let breakedList = this._formatListByLength2(d, ele.length);
                breakedList.forEach(chunk => {
                    component = new ComponentItem(
                        ListComponent, {
                            data: chunk,
                            label: ele.label,
                            value: ele.value,
                            title: ele.title,
                            header: !ele.header || false,
                            columnNames: ele.columnNames || {}
                        }
                    );
                });
                    
                break;
            case "number-board":
                component = new ComponentItem(
                    NumberBoardComponent, {
                        title: ele.title,
                        json: d,
                        unit: ele.unit,
                        value: ele.value
                    }
                );
                break;
            case "bubble":
                component = new ComponentItem(
                    D3Component, {
                        title: ele.title,
                        jsonArr: d,
                        id: this._generateIds(ele.type),
                        value: ele.value,
                        label: ele.label,
                        type: ele.type
                    }
                );
                break;
            case "progressBar":
                component = new ComponentItem(
                    D3Component, {
                        title: ele.title,
                        jsonArr: d,
                        id: this._generateIds(ele.type),
                        value: ele.value,
                        label: ele.label,
                        type: ele.type
                    }
                );
            case "scatterDiff":
                component = new ComponentItem(
                    D3Component, {
                        title: ele.title,
                        jsonArr: d,
                        id: this._generateIds(ele.type),
                        value: ele.value,
                        label: ele.label,
                        type: ele.type
                    }
                );
                break;
            case "scatterDiscrim":
                component = new ComponentItem(
                    D3Component, {
                        title: ele.title,
                        jsonArr: d,
                        id: this._generateIds(ele.type),
                        value: ele.value,
                        label: ele.label,
                        type: ele.type
                    });
                break;
            case "wordcloud":
                component = new ComponentItem(
                    WordCloudComponent, {
                        title: ele.title,
                        json: d,
                        id: this._generateIds(ele.type),
                        value: ele.value,
                        label: ele.label,
                    });
                break;
            case "radar":
                component = new ComponentItem(
                    RadarComponent, {
                        id: this._generateIds(ele.type),
                        title: ele.title,
                        label: ele.label,
                        value: ele.value,
                        jsonArr: d
                    }
                );
                break;
            default:
                // default setting is c3 setting
                component = new ComponentItem(
                    C3Component, {
                        id: this._generateIds(ele.type),
                        jsonArr: d,
                        title: ele.title,
                        legends: ele.legends,
                        x: ele.x,
                        y: ele.y,
                        type: ele.type
                    }
                );
                break;
        }

        return component;
    }

    /**
         * 根據使用者輸入的長度切分資料,
         * 例: 資料長度為12, 使用者指定清單長度為6, 則回傳兩組長度為6的清單
         * @param {Object[]} dataArray - The ｀data json array
         * @param {number} length - The length user specific
         * @returns {Array[]} - The 2-dimision array of lists
     */
    private _formatListByLength(dataArray, length){
            
            // The array of storing lists
            let chuncks = [];
            let arrLen = dataArray.length;

            let keep = 0; // 0 -> stop splitting data array
                        // 1 -> keep splitting data array
            let i = 0;    // index of data array

            // split array by length
            while(keep == 0){
                // arr.slice(begin, end)
                // if end < array length, keep splitting
                if(i+length < arrLen){
                    chuncks.push(dataArray.slice(i,i+length));
                    keep = 0;
                }
                // if end == array length, stop splitting
                else if(i+length == arrLen){
                    chuncks.push(dataArray.slice(i,i+length));
                    keep = 1;
                }
                // if there is no need to split, stop
                else{
                    chuncks.push(dataArray.slice(i, arrLen));
                    keep = 1;
                }
                i = i + length;
            }
            return chuncks;
    }

    /**
         * 直接回傳指定長度的清單
         * 例: 資料長度為12, 使用者指定清單長度為6, 則只回傳一組長度為6的清單
         * @param {Object[]} dataArray - The data json array
         * @param {number} length - The length user specific
         * @returns {Array[]} - The 2-dimision array of lists
     */
     private _formatListByLength2(dataArray, length){
            
            // The array of storing lists
            let chuncks = [];
            let newArray = dataArray.slice(0, length);
            chuncks.push(newArray);
            
            return chuncks;
    }

    /**
         * 自動產生id編號, rule = id + type + i in this.idStore
         * @param {String} type - The type of the chart
         * @returns {String} - The generated id string
     */
    private _generateIds(type){

        // get _idStore length
        let index = this.idStore.length;
        let id = type + index;
        this.idStore.push(id);

        return id;        
    }
}