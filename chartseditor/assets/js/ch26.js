/**
 * Created by hang on 2/26/16.
 */
$(function () {
    convertedServerData('data/gv26.json');
});

function convertedServerData(jsonPath) {
    $.getJSON(jsonPath)
        .done(function (json) {
            console.log(json);
            initHighChartWith(json);
        })
        .fail(function (error) {
            console.log(error);
        })
    ;
}

function initHighChartWith(data) {

    var seriesdata = [];
    var categories = [];

    for (var i in data.data.series) {
        var temp = {};
        temp.name = data.data.series[i].name;
        console.log(temp.name);

        temp.data = [];
        //new item
        temp.stack = data.data.series[i].stack;
        console.log(temp.stack);
        for (var j in data.data.series[i].data) {
            temp.data.push(data.data.series[i].data[j]);
        }
        seriesdata.push(temp);
    }

    $(function () {
        $('#container').highcharts({

            chart: {
                type: 'column'
            },

            title: {
                text: 'Driver Chart(Negative)'
            },

            xAxis: {
                categories: ['Chart Title1', 'Chart Title1', 'Chart Title1', 'Chart Title1', 'Chart Title1']
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: seriesdata

        });
    });
}