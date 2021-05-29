#Tableau report speedtest tool
###Introduction
This is the Tableau reports speed testing tool repository. You can use the tool to test your Tableau reports speed.

###Homepage
https://tableau-speedtest.site

###How to use it?
<b>Step 1:</b> Fill the server config form and press <b>Load Configs</b>. You can pass this step and use last version of Tableau JS API 
available at Tableau Public. Also, you can choose your server or site and the version of your server to load the main script directly form your site.<br>
<b>Step 2:</b> Enter link to the report you want to test. To get valid link on Tableau Public you can click on share button and copy the link from pop-up window.<br>
Also, you can set the width and height of the iframe that will contain your report.<br>
<b>Step 3:</b> Click <b>Run Test</b> button and wait. The tool will show you how much time you spend waiting the report loads and the report itself.<br>
Obliviously, you need to have access the report ;)
You can click the button again to run second test and so on. You will see all your test results in table or bar chart. Also, the tool will count the average loading speed of your report.<br>

###How it works?
Mainly I use <a href="https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api.htm" >Tableau JS API</a> to load and interact with the workbook.
The tool does not collect any information about your data. It's absolutely free to use.<br>
Also, you can get list of all the views used on tested dashboard (button will be shown when report loads).<br>

###Can I contribute?
Of course! Any help will be appreciated! Contact me via email or simply create a new pull request.

###To Do List
1) Do n tests button
2) Export results to Excel file button
3) Get list of filters and parameters
4) Measure speed of filter / parameter changes