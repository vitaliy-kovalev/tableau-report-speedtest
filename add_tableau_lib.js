document.getElementById("config_button").addEventListener("click", add_all_scripts);

function validate() {

    if (document.getElementById("server_path").value.length < 5) {
        alert('Cannot take Tableau JS API from empty link, use something like "https://some.tableau.server.com/"');
        return 100
    }

}

function script_add(source) {

    let js_code = document.createElement('script');
    js_code.type = 'text/javascript';
    js_code.src = source;
    js_code.async = false;
    let all_scripts = document.getElementById('scripts');
    all_scripts.appendChild(js_code);

}

function scripts_remove() {

    let scripts = document.getElementById('scripts').children;
    scripts[1].remove();
    scripts[1].remove();
    scripts[1].remove();
    scripts[1].remove();
    document.getElementById('single_test_button').disabled = true;
}

function add_all_scripts() {
    let scripts = document.getElementById('scripts').children;
    if (scripts.length > 1) {
        scripts_remove()
    }
    let server_type = document.getElementById('server_type').value;
    let server = '';
    if (server_type === '') {
        server = document.getElementById('server_path').value;
    }

    let server_version = document.getElementById('server_version').value;
    let tableau_api_src = server_type + server + 'javascripts/api/' + server_version;



    if (validate() != 100) {
        script_add(tableau_api_src);
        script_add('./speedtest.js');
        script_add('./speedtest_common_functions.js');
        script_add('./speedtest_charts.js');
        // Enable test button
        document.getElementById('single_test_button').disabled = false;
        document.getElementById("config_button").textContent = '3. Re-Load Configs';
        }
        else {
            alert("API is not loaded. Check your server path.")
        }

    }