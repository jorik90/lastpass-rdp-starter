function getHostname(naamvanhost, notities) {
	var findHostIn = naamvanhost;
	if(naamvanhost.indexOf('.') === -1) {
		findHostIn = notities;
	}
	
	var ipregx = findHostIn.match(/\b(((?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))(?::(\d{2,5}))?\b/);
	if(ipregx) {
		return ipregx[0];
	}
	
	var res = findHostIn.match(/\/v[: ]([^\s]+)/i);
	if(res) {
		return res[1];
	}
	return findHostIn;
}

function connect(creds) {
	server = getHostname(creds.server, creds.notes);
	user = creds.user;
	pass = creds.pass;
	
	serverParts = server.split(":");
	if(serverParts.length > 1) {
		server = serverParts[0];
		port = serverParts[1];
	} else {
		port = 3389;
	}
	var rdpCmd = server + '///' + user + '///' + pass + '///' + port;
	location.href = 'rdp:///' + rdpCmd;

	return;
	chrome.tabs.create({ url: 'http://example.com' }, function(tab) {
		var c = "\
		setTimeout(function() {\
		var elm = document.getElementsByTagName('div')[0];\
		elm.parentNode.removeChild(elm);\
		},0);\
		var fired = false;\
		var fallbackFunc = function() {\
			if(fired) { return; }\
			fired = true;\
			alert('Kan de RDP-sessie niet starten. Waarschijnlijk heb je het rdp-protocol niet. Voeg deze toe aan je register.');\
			window.close();\
		};\
		var fallbackTimeout = setTimeout(fallbackFunc, 2500);\
		window.addEventListener('blur', function (evt) {\
			clearTimeout(fallbackTimeout);\
			window.addEventListener('focus', function(){	window.close() });\
		});\
		location.href = 'rdp:///" + rdpCmd + "';";
		
		chrome.tabs.executeScript(tab.id, { code: c });
		
	});
}

function startrdp() {
	chrome.devtools.inspectedWindow.eval(
		"(function(){ return { user: $('#noteForm .dialogInput:nth(1)').val(), pass: pass = $('#noteForm .dialogInput:nth(2)').val(), server: $('#noteForm .dialogInput:nth(0)').val(), notes: $('#noteForm .dialogInput:nth(3)').val() }}())",
		function(result,isexception) {
			connect(result);
		}
	);
}
document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById('startagain').addEventListener('click', function() {
		startrdp();
	});

	startrdp();
});