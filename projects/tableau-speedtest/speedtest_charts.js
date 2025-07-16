function make_chart() {

    const chart = Highcharts.chart('container', {
        chart: {type: 'bar', backgroundColor: '#ffffff'},
        //title: {text: '<span style="font-family: Arial; color: black"><b>Loading Time</b> ⏱</span>', align: 'left'},
        title: false,
        xAxis: {categories: wb_names,
            type: 'category',
            title: {text: null},
            scrollbar: {enabled: true},
            labels: {align:'left',
                reserveSpace: true
            }
        },
        yAxis: {title: {text: '<span style="font-family: Arial;">— Avg Load Time, sec: <b>' + arr_avg(avg_list).toFixed(2) * 1+'</b></span>',
                align: 'high'
            },
            plotLines: [{
                color: 'gray',
                dashStyle: 'solid',
                value: arr_avg(avg_list).toFixed(2)*1,
                width: 1
            }]
        },
        series: [{type: 'column', name: 'Load Time, sec', data: avg_list, labels: true, color: '#4CAF50'}],
        tooltip: {
            style: {
                color: 'black'
            },
            footerFormat: '| AVG Load Time, sec: <b>' + arr_avg(avg_list).toFixed(2) + ' </b>'
        },
        legend: false,
        plotOptions: {column: {maxPointWidth: 50, dataLabels: {enabled: true}}},
        credits: {enabled: false}
    });

}