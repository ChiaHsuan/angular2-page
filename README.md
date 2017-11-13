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

