import { Type } from '@angular/core';

/**
 * data format could be 
 * 詳情請看c3.js reference
    [
        ['data1', 1,2,3]
        ['data2', 1,2,3]
    ]
    or
    [
        { 
            'key': 'data_key',
            'data': 123
        },
        { 
            'key': 'data_key',
            'data': 123
        }
        ......
    ]
 */
export class ListSchema {
    constructor(
        public title: string, // chart title, e.g 學習時長
        public data: Array<any>, // data input
        public label: string, // key 
        public value: string, // key
        public length: number,
        public header: boolean,
        public columnNames: JSON
    ) {}
}

// type:"list",
//             url: environment.stableZeppelin.teacher + "right-top/Top5.csv",
//             label: "Student",
//             value: "Score",
//             title: "學霸排名",
//             length: 5,
//             header: true,
//             columnNames: {
//                 labelName: "姓名",
//                 valueName: "成績"
//             }