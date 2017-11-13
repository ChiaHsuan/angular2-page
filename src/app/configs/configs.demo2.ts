import { environment } from '../../environments/environment';

'use strict';

export var configs = {
    siteInfo: [
        {
            type: "site-info",
            url: environment.stableZeppelin.operation + "top-numbers.csv",
            title: "Page2 Title",
            label: "Infomation",
            value: "totalLesson"
        }
    ],
    centerTop: [
        {
            type: "number-board",
            url: environment.stableZeppelin.student + "top-numbers.csv",
            title: "Learn Hours",
            value: "hour",
            unit: "hour"
        }
    ],
    centerTop2:[
        {
            type: "number-board",
            url: environment.stableZeppelin.student + "top-numbers.csv",
            title: "Average Score",
            value: "avgScore",
            unit: "score"
        }
    ],
    centerTop3:[
        {
            type: "number-board",
            url: environment.stableZeppelin.student + "top-numbers.csv",
            title: "Failed Rate",
            value: "rate",
            unit: "%"
        }
    ],
    leftTop: [
        {
            type:"list",
            url: environment.stableZeppelin.student + "left-top/Lesson.csv",
            label: "Lesson",
            value: "PassFail",
            title: "Hot coureses",
            header: true,
            columnNames: {
                labelName: "Course",
                valueName: "Pass(P) or Faile(F)"
            },
            length: 5
        }
    ],
    leftBottom: [
       {
            type: 'progressBar',
            url: environment.stableZeppelin.student + "left-bottom/Mission.csv",
            title: "Mission Progress",
            label: "Lesson",
            value: "Process"
       },
    ],
    middle: [
       {
           type: "radar",
           url: environment.stableZeppelin.student + "middle/radar.csv",
           label: "Ability",
           value: "Score",
           title: "Ability Radar Chart"
       },
       {
           type: "bar-line",
           url: environment.stableZeppelin.student + "middle/Score.csv",
           title: "Personal Score vs department average score",
           x: "Dep",
           y: ["Avg"],
           legends: ["depart average score"],
       }
    ],
    rightTop: [
        {
            type:"list",
            url: environment.stableZeppelin.student + "right-top/Hot.csv",
            label: "Lesson",
            value: "Click",
            title: "Hot courses",
            header: true,
            columnNames: {
                labelName: "Course",
                valueName: "Click times"
            },
            length: 5
        },
        {
            type:"list",
            url: environment.stableZeppelin.student + "right-top/RecommendBook.csv",
            label: "Lesson",
            value: "",
            title: "Recommanded Lessons",
            length: 6
        }
    ],
    rightBottom: [
        {
            type: "list",
            url: environment.stableZeppelin.student + "right-bottom/Warn.csv",
            label: "Lesson",
            value: "",
            title: "Alert Lessons",
            length: 6
        }
    ]
};
