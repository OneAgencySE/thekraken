
var element;

window.config = {
    tenant: "db1271e1-985e-4b67-957d-910f6618d2b4", // Optional by default, it sends common
    clientId: "d2291124-17b4-4cb5-abae-7c0f7eb788ab",
};


var authContext = new AuthenticationContext(config);
// Check For & Handle Redirect From AAD After Login
var isCallback = authContext.isCallback(window.location.hash);
authContext.handleWindowCallback();
console.log(authContext.getLoginError());

if (isCallback && !authContext.getLoginError()) {
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}

var now = new Date();
var delay = 60 * 60 * 1000; // 1 hour in msec
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

function authenticateAndGetData(){
    if(!authContext.getCachedUser()) {
        authContext.login();
    } else {
        authContext.acquireToken("https://analysis.windows.net/powerbi/api", function (error, token) {

                    // Handle ADAL Error
                    if (error || !token) {
                        console.log('ADAL Error Occurred: ' + error);
                        return;
                    }
    		    embed(token);
        })
    }
    setTimeout(authenticateAndGetData, delay);
}


function embed(token){
    var accessToken = document.getElementById('accessToken').innerText;

    var embedUrl = document.getElementById('embedUrl').innerText;
    var reportId = document.getElementById('reportId').innerText;

    var container = document.getElementById("container");
    var config = {
        type: 'report',
        accessToken: token,
        embedUrl: embedUrl,
        id: reportId,
        settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false
        }
    };

    powerbi.embed(container, config);
    element = powerbi.get(container);
}
window.onload = function() {
    authenticateAndGetData();
}
