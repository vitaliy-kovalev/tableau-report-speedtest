document.getElementById("config_button").addEventListener("click", add_all_scripts);

function script_add(source) {
    const js_code = document.createElement('script');
    js_code.className = 'addedByScript';
    js_code.type = 'text/javascript';
    js_code.src = source;
    js_code.async = false;
    const all_scripts = document.getElementById('scripts');
    all_scripts.appendChild(js_code);
}

function scripts_remove() {
    document.querySelectorAll('script').forEach(script => {
        if (script.className !== 'onLoad') {
            console.info(script.src, ' removed');
            script.remove()
        }
    });
}

function add_all_scripts() {
    scripts_remove();
    const server_type = document.getElementById('server_type').value;
    const server = document.getElementById('server_path').value;
    const server_path_placeholder = document.getElementById('server_path').placeholder;
    const server_version = document.getElementById('server_version').value;
    if (server_type === '') {
        if (server.length < 1) {
            alert('Check your server path: ' + server_type + 'It must be something like this: ' + server_path_placeholder);
            return 100
        }
    }
    const tableau_api_src = server_type + server + 'javascripts/api/' + server_version;
    script_add(tableau_api_src);
    script_add('./speedtest.js');
    script_add('./speedtest_common_functions.js');
    script_add('./speedtest_charts.js');
    // Enable test button
    document.querySelector('.single_test_btn').disabled = false;
    document.getElementById("config_button").textContent = 'Re-Load Configs';
    document.getElementById("config_button").className = 'configs_loaded';
    document.querySelector(".configs_loaded").addEventListener("click", clear_results);
    }

function clear_results() {
    let old_viz = window.tableau.VizManager.getVizs()[0];
    if (old_viz) {
        old_viz.dispose();
    }
}