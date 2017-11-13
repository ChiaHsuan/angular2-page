### Description
The project idea is to accelerate the process of creating the same html pages with similar charts or other things base on Angular2

### Ideas
#### Generate the page from the configuration file in src/app/configs
Specifying the settings of each position on the page according to the page layout

The page layout
```
-----------------------------------------------
 siteInfo  |  centerTop1 | centerTop2 | Logo
-----------------------------------------------
           |                          |
  lefttop  |                          | rightTop
           |                          |
-----------         middle             ---------
           |                          |
leftBottom |                          | rightBottom
           |                          |
-----------------------------------------------
```

The configuration example
```
export var configs = {

    leftBottom: [ 
        { configuration1 },
        { configuration2 }
    ],
}
```

The configuration's key and value is based on different module,
The example:
```
export var configs = {
    middle: [
        {
            type: "pie",       // fixed name of chart type
            url: "data file",   // data api or data file path
            title: "piechart title",
            x: "Gender",         // the value of x-axis according to your data.csv or data.json
            y: ["count_Gender"], // the value of y-axis according to your data.csv or data.json, must be an array
            legends: ["This is the number of people count"], // the description of data
            pieTitle: "Pie Chart title",
            preprocess: true,    // if you need preprocess your data
            callback: function(d){
                 return d[1];    // the data preprocessor function
            }
        },
        {
            type:"list",
            url: "data file",   // data api or data file path,
            label: "Teacher",
            value: "Rank",
            title: "Good Teachers",
            length: 5,
            header: true,
            columnNames: {
                labelName: "teacher name",
                valueName: "teacher rank"
            }
        }
    ],
}
```


#### Build the site
Run `ng build --base-href /folder/` to build the project. The build artifacts will be stored in the `exh-app/` directory. Use the `-prod` flag for a production build.

