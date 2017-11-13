import { environment } from '../../environments/environment';

'use strict';

export var configs = {
    siteInfo: [
        {
            type: "site-info",
            url: environment.stableZeppelin.operation + "top-numbers.csv",
            title: "Page Title",
            label: "Some Info",
            value: "totalLesson"
        }
    ],
    centerTop: [
        {
            type: "number-board",
            url: environment.dataBase + "LearnInfoByDateAndGroup.json",
            title: "Activity User",
            value: "NewUser",
            unit: "",
        },
        {
            type: "number-board",
            url: environment.dataBase + "LearnInfoByDateAndGroup.json",
            title: "New User",
            value: "NewUser",
            unit: "",
            preprocess: true,
            callback: function(d){
                // d is an array
                let total = d.reduce((a,b) => {
                    return {
                        NewUser: a.NewUser + b.NewUser
                    }
                });
                return [{
                    "NewUser": total.NewUser
                }];
            }
        }
    ],
    centerTop2:[
        {
            type: "number-board",
            url: environment.stableZeppelin.operation + "top-numbers.csv",
            title: "Some Data",
            value: "totalLesson",
            unit: ""
        },
        {
            type: "number-board",
            url: environment.stableZeppelin.operation + "top-numbers.csv",
            title: "Some Data",
            value: "monthlyNewLesson",
            unit: "件"
        }
    ],
    leftTop: [
        {
            type: "bubble",
            url: environment.stableZeppelin.ad + "right-bottom/ReceiverAreaRank.csv",
            title: "Area",
            value: "Percentage",
            label: "Label"
        },
        {
            type: "bubble",
            url: environment.stableZeppelin.ad + "right-bottom/FactoryRank.csv",
            title: "Factory",
            value: "Percentage",
            label: "Label"
        }
        
    ],
    leftBottom: [
        {
            type: "pie",
            url: "./assets/data/GY_Gender_Describe.json",
            title: "User Persona",
            x: "AREA",
            y: ["count_AREA"],
            legends: ["People"],
            preprocess: true,
            callback: function(d){
                /**
                 * d is like
                 * 0: BG, 1 is Gender, 2 is AREA
                 * [ [],[],[],[],[] ]
                 */
                 let area = d[2];
                 let top5 = area.slice(0,5);
                 let remaining = area.slice(5, area.length).reduce((a,b)=> {
                        return {
                            count_AREA: a['count_AREA'] + b['count_AREA']
                        }
                    });

                top5.push({
                    AREA: 'others',
                    count_AREA: remaining.count_AREA
                });

                return top5;
            }
        }
    ],
    middle: [
        {
            type: "iframe",
            url: "http://treeqqq.com/map",
            title: "Map iframe example"
        },
        {
            type: "timeseries",
            url: environment.dataBase + "LearnInfoByDateAndGroup.json",
            x: "Date",
            y: ["ActiveUserCount", "UnactiveUserCount", "NewUser", "DormancyUserCount"],
            legends: ["Active User", "Unactive User", "New User", "Sleep User"],
            title: "Activity Data"
        }
    ],
    rightTop: [
        {
            type:"list",
            url: environment.stableZeppelin.operation + "right-top/LessonAdd.csv",
            label: "Lesson",
            value: "none",
            title: "Data",
            length: 6
        },
        {
            type:"list",
            url: environment.stableZeppelin.operation + "right-top/LessonWarn.csv",
            label: "Lesson",
            value: "none",
            title: "Data",
            length: 6
        }
    ],
    rightBottom: [
        {
            type: "wordcloud",
            url: environment.dataBase + "SearchKeyword.json",
            label: "KeyWord",
            value: "Count",
            title: "Searched Keyword Analysis"
        },
        {
            type: "list",
            url: environment.stableZeppelin.operation + "right-bottom/LessonFrom.csv",
            label: "Company",
            value: "Amount",
            title: "Lesson Sources",
            length: 5,
            header: true,
            columnNames: {
                labelName: "Lesson",
                valueName: "Number"
            }
            
        }
    ]
};
