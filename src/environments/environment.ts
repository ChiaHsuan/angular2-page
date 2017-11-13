// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    
    production: false,
    stableZeppelin: {
        operation: "./assets/zeppelin-data/FirstBoard/stable/",
        student: "./assets/zeppelin-data/SecondBoard/2017-03-18T03:12:28.967Z/",
        ie: "./assets/zeppelin-data/ThirdBoard/2017-03-18T03:33:03.192Z/",
        teacher: "./assets/zeppelin-data/FourthBoard/2017-03-18T03:39:42.681Z/",
        ad: "./assets/zeppelin-data/ad/2017-03-21T01:24:03.042Z/"
    },
    fulearnBase: "http://10.130.137.124/bigdata-angular/api/fulearn/",
    dataBase: "./assets/data/"
};