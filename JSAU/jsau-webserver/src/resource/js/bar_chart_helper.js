let d3 = require('d3');
let jsdom = require('jsdom');
const {JSDOM} = jsdom;

const {document} = (new JSDOM('')).window;
let doc = global.document || document;

let barChart = require('./bar_chart');


let getBarChart = function(params) {

    let chart = barChart()
        .data(params.data)
        .width(params.width)
        .height(params.height)
        .xAxisLabel(params.xAxisLabel)
        .yAxisLabel(params.yAxisLabel);


    d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

    let selector = params.containerId;
    let svg = d3.select(doc.getElementById(selector)).node().outerHTML;
    d3.select(doc.getElementById(selector)).remove();

    return svg;

};


module.exports = {
    getBarChart
};
