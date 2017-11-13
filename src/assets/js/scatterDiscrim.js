function drawScatter(data, id) {

    // discrimination criterion for coloring
    var criterion = [0.2, 0.4, 1.1];

    // Nest data and get keys for setting ordinal x scale
    var nestData = d3.nest()
        .key(function(d) {
            return d.KechengID;
        })
        .entries(data);

    // get keys for oridnal scale
    var keys = nestData.map(function(d) {
        return d.key;
    });

    // svg  container setting
    var svg = {

        width: 350,
        height: 230,
        padding: {
            top: 10,
            bottom: 58,
            left: 35,
            right: 0
        }

    };

    var g = {

        width: svg.width - svg.padding.left - svg.padding.right,
        height: svg.height - svg.padding.top - svg.padding.bottom,
        // padding: 0
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    };

    var container = d3.select(id)
        .append("svg")
        .attr({
            width: svg.width,
            height: svg.height
        })
        .append("g")
        .attr("transform", "translate(" + [svg.padding.left, svg.padding.top] + ")");

    // set the colors for each threshold
    var colors = d3.scale.threshold()
        .domain(criterion)
        .range(['#FF3333', '#BD7211', '#66CC00']);


    // set scale
    var scale = {
        x: d3.scale.ordinal()
            .domain(keys)
            .rangePoints([g.padding.left, g.width - g.padding.right], 2),

        y: d3.scale.linear()
            .domain([-1, 1])
            .range([g.height - g.padding.top - g.padding.bottom, 0])
    };

    // set axis
    var axis = {
        x: d3.svg.axis()
            .scale(scale.x)
            .orient("bottom")
            .tickValues(""),

        y: d3.svg.axis()
            .scale(scale.y)
            .innerTickSize(6)
            .tickPadding(4)
            .orient("left")
    };

    // set keyFunction
    var keyFunction = function(d) {
        return d.errorsubject;
    };

    var yAxis = container.append("g")
        .attr("class", "axis")
        //  .attr("transform", "translate(" + [ g.padding ,0] + ")")
        .call(axis.y);

    // generate dots
    var dots = container.append("g")
        .attr("class", "dots")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g");

    dots.append("circle")
        .attr({
            cx: function(d) {
                return scale.x(d.KechengID);
            },
            cy: function(d) {
                return scale.y(d.discrim);
            },
            r: 3,
            fill: function(d) {
                return colors(d.discrim);
            },
            stroke: 'black'
        });

    // append 0.4 lines
    container.append("line")
        .attr({
            x1: scale.x(keys[0]),
            y1: scale.y(0.4),
            x2: g.width,
            y2: scale.y(0.4),
            "stroke-width": 1,
            stroke: colors(0.5)
        });

    // append 0.2 lines
    container.append("line")
        .attr({
            x1: scale.x(keys[0]),
            y1: scale.y(0.2),
            x2: g.width,
            y2: scale.y(0.2),
            "stroke-width": 1,
            stroke: colors(0.1)
        });

}