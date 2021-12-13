// event listeners
//document.getElementById("single_test_button").addEventListener("click", single_test);
document.querySelectorAll(".single_test_btn").forEach( btn => btn.addEventListener("click", single_test));
document.getElementById("clear_tests_button").addEventListener("click", clearTestResults);
document.getElementById("get_sheets_button").addEventListener("click", getWorksheetNames);
document.getElementById("clear_sheets_button").addEventListener("click", clearWorksheetNames);
document.getElementById("show_results_btn").addEventListener("click", show_results);
document.querySelector(".results_back").addEventListener("click", hide_results);

let wb_names = [];         // array of tested wb names
let avg_list = [];         // array of test time
let table_data = [];       // array for store table data
let link_list = [];        // array of tested links
let start_dttm_list = [];  // array of testing start time
let viz_counter_list = []; // array of num of visualisations in tested link
let data_raw = [];         // array for chart creation

function initViz(dash_url, container_id, loadtime_ele, avg_loadtime, w, h) {
    /*
    function is take your link and embed it to iframe object, then it counts time to first possible interactive
    param: dash_url     — URL https://[server]/[link_to_dashboard]
    param: container_id — ID of container to embed dashboard iframe
    param: loadtime_ele — container for table with data
    param: avg_loadtime — container for tim
    param: w            — width of container
    param: h            — height of container
     */

    // start count time before load of the dashboard
    let before = new Date();
    let before_loadtime = before.getTime();
    // do timestamp from date
    let DD   = before.getDate();
    if (DD<10) {DD = '0' + DD} else {DD = '' + DD};
    let MM   = before.getMonth() + 1;
    if (MM<10) {MM = '0' + MM} else {MM = '' + MM};
    let YYYY = before.getFullYear();
    let hh   = before.getHours();
    if (hh<10) {hh = '0' + hh} else {hh = '' + hh};
    let mm   = before.getMinutes();
    if (mm<10) {mm = '0' + mm} else {mm = '' + mm};
    let ss   = before.getSeconds();
    if (ss<10) {ss = '0' + ss} else {ss = '' + ss};
    let dttm_f = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;

    // finding container by id
    var containerDiv = document.getElementById(container_id);

    // in this dict we'll pass som args and will find out how much time we spent waiting dashboard full loads
    // options start ---------------------------------------------------------------------------------------------------
    var options = {
        hideTabs: false,
        width:    w + "px",
        height:   h + "px",
        onFirstInteractive: function () {
            document.querySelector('.loader_back').hidden = true;
            document.querySelector('.loader').hidden = true;
            document.querySelector('.results').hidden = false;
            if (document.querySelector('.results').className !== "results display") {
                document.querySelector('.results').className += " display";
            }
            document.querySelector('.results_back').hidden = false;
            // the function will work immediately after loading the dashboard and the possibility of interacting with it appears
            // count how much time we spend on loading
            let aftr_loadtime = new Date().getTime();
            let pgloadtime = (aftr_loadtime - before_loadtime) / 1000;

            // number of vizzes on dashboard
            let vznum = tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getWorksheets().length;

            // workbook name
            let wb_name = tableau.VizManager.getVizs()[0].getWorkbook().getName();

            // make table visible
            document.getElementById('t1').hidden = false;

            // saving records
            avg_list.push(pgloadtime.toFixed(2)*1); // load time
            link_list.push(dash_url); // link
            start_dttm_list.push(dttm_f); // Timestamp of test start
            viz_counter_list.push(vznum); // number of vizzes
            wb_names.push(wb_name);

            // data for table: one result → one table row
            table_data.push("<tr><td>" + wb_name + "</td><td>" + dttm_f + "</td><td>" + vznum + "</td><td>" + pgloadtime.toFixed(2) + "</td></tr>");
            document.getElementById(loadtime_ele).innerHTML = table_data.join('');

            // avg results
            document.getElementById(avg_loadtime).innerHTML = "<b>"+arr_avg(avg_list).toFixed(2)+"</b>";

            // Unlock / unhide buttons
            document.getElementById('get_sheets_button').disabled = false;
            document.getElementById('get_sheets_button').hidden = false;
            document.getElementById('clear_tests_button').hidden = false;
            document.getElementById('show_results_btn').hidden = false;

            // Push to data_raw and make visible button that can run barchart builder
            data_raw.push({time: dttm_f, value: pgloadtime.toFixed(2)});

            // Make barchart with results
            sleep(500).then(make_chart);
            
            // Counting how mutch tests have been done
            ym(85727752,'reachGoal','test')
        }
    };
    // options end -----------------------------------------------------------------------------------------------------
    // make new tableau.Viz
    let viz = new tableau.Viz(containerDiv, dash_url, options);
    return viz;
}

function single_test() {
    let dash_url = document.getElementById("report_link").value;
    dash_url = dash_url.replace('/#/','/'); // just in case
    let w = document.getElementById("report_w").value;
    let h = document.getElementById("report_h").value;
    document.querySelector('.loader_back').hidden = false;
    document.querySelector('.loader').hidden = false;

    // clean up the iframe before starting test (in case it was previously loaded)
    let old_viz = window.tableau.VizManager.getVizs()[0];
    if (old_viz) {
        old_viz.dispose();
        sleep(200).then(() => {
            let res = initViz(dash_url, 'vizContainer','loadtime','avg_loadtime', w, h);
            return res
        });
    } else {
        let res = initViz(dash_url, 'vizContainer','loadtime','avg_loadtime', w, h);
        return res
    }
}

function getWorksheetNames() {
    
    // document.getElementById('ws_names').innerHTML = '';
    let ws_array = [];
    let l = tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getWorksheets().length;
    for (let i = 0; i < l; i++) {
        ws_array.push('<tr><td style="width: 30px">' + (i+1).toString() + ". </td><td style='width: 442px'>" + tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getWorksheets()[i].getName()+"</td></tr>")
    }
    document.getElementById('ws_names').innerHTML = ws_array.join('');
    document.getElementById('clear_sheets_button').hidden = false

}

function clearWorksheetNames() {

    document.getElementById('ws_names').innerHTML = '';
    document.getElementById('clear_sheets_button').hidden = true;

}

function clearTestResults() {
    // delete all results
    let old_viz = window.tableau.VizManager.getVizs()[0];
    if (old_viz) {
        old_viz.dispose();
    }
    table_data = [];           
    link_list = [];        
    start_dttm_list = [];  
    viz_counter_list = []; 
    avg_list = [];         
    data_raw = [];
    wb_names = [];
    document.getElementById('loadtime').innerHTML = '';
    document.getElementById('avg_loadtime').innerHTML = '';
    document.getElementById('clear_tests_button').hidden = true;
    document.getElementById('get_sheets_button').disabled = true;
    document.getElementById('get_sheets_button').hidden = true;
    document.getElementById('t1').hidden = true;
    document.getElementById('show_results_btn').hidden = true;

    Highcharts.chart('container',{}).destroy();
    if (document.querySelector('.results').className === "results display") {
        document.querySelector('.results').className = "results";
    }
    document.querySelector(".results").hidden = true;
    document.querySelector(".results_back").hidden = true;

}

function hide_results() {
    if (document.querySelector('.results').className === "results display") {
        document.querySelector('.results').className = "results";
    }
    document.querySelector(".results").hidden = true;
    document.querySelector(".results_back").hidden = true;
}

function show_results() {
    document.querySelector(".results_back").hidden = false;
    if (document.querySelector('.results').className !== "results display") {
        document.querySelector('.results').className += " display";
    }
}
