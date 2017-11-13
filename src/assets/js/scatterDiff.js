function xy_chart_diffcultity(id) {
    var margin = {
        left: 40,
        bottom: 70,
        top: 0
    };

    var r = 3;

    function my() {

        var width = 350;
        var height = 230;

        var difficulties = {
            easy: 0,
            hard: 0,
            normal: 0,
            total: 0
        }

        data.forEach(function (d) {
            difficulties.total += 1;
            if (d.difficulty > 0.7) {
                difficulties.easy += 1;
            } else if (d.difficulty < 0.3) {
                difficulties.hard += 1;
            } else {
                difficulties.normal += 1;
            }
        })

        difficulties.hard_persent = Math.round(difficulties.hard / difficulties.total * 100);
        difficulties.easy_persent = Math.round(difficulties.easy / difficulties.total * 100);
        difficulties.normal_persent = Math.round(difficulties.normal / difficulties.total * 100);

        /*
          chart
        */
        var x = d3.scale.ordinal()
            .domain(data.map(function (d) {
                return d["KechengID"]
            }))
            //.rangeRoundBands([r + margin.left, width - r]);
            .rangeBands([margin.left, width]);

        var y = d3.scale.linear()
            .domain([ 0, 1 ])
            .range([r + margin.top, height - margin.bottom - r - margin.top].reverse());

        var chart = d3.select(id).append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 400 300")
            .attr("preserveAspectRatio", "xMinYMin");
        
        var distinct = d3.nest()
            .key(function (d) {
                return d["KechengID"]
            })
            .entries(data);

        var lock;

        chart = chart.append("g")
            .attr("transform", "translate(0," + (r + margin.top) + ")")

        var circle = chart.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("fill", function (d) {
                if (d["difficulty"] > 0.7) {
                    // too easy
                    return "green";
                } else if (d["difficulty"] < 0.3) {
                    // too hard
                    return "red";
                } else {
                    return "gray";
                }
            })
            .attr("cx", function (d) {
                return x(d["KechengID"]);
            })
            .attr("cy", function (d) {
                return y(d["difficulty"]);
            })
            .attr("r", r)
            .attr("stroke", "black");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(yAxis)
            .selectAll("line")
            .each(function (d, a) {
                if (d == 0.3) {
                    d3.select(this)
                        .attr("x2", width)
                        .style({
                            stroke: "orange"
                        });
                } else if (d == 0.7) {
                    d3.select(this)
                        .attr("x2", width)
                        .style({
                            stroke: "orange"
                        });
                }
            });

    }

    my.width = function (val) {
        width = val;
        return my;
    };

    my.height = function (val) {
        height = val;
        return my;
    };

    my.data = function (d) {
        // draw scatter
        data = d;
        data = data.sort(function (a, b) {
            return a["KechengID"] - b["KechengID"]
        });
        my(d);

        return my;
    };

    return my;
}