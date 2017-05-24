(function() {
	if(location.href.indexOf('lastpass-rdp-starter.html') > -1 || location.href.indexOf('github.io') > -1) {
		alert('Do not click, but drag this button to your bookmarks-bar.');
		return;
	}
	function getHostname(naamvanhost, notities) {
		var findHostIn = naamvanhost;
		if(naamvanhost.indexOf('.') === -1) {
			findHostIn = notities;
		}
		
		var ipregx = findHostIn.match(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/);
		if(ipregx) {
			return ipregx[0];
		}
		
		var res = findHostIn.match(/\/v[: ]([^\s]+)/i);
		if(res) {
			return res[1];
		}
		return findHostIn;
	}
	
	if(typeof(LPDialog) !== "object") {
		alert('You can only use this bookmarklet inside your LastPass vault.');
		return;
	}
	
	var dialog = $('.dialog:visible');
	if(dialog.length === 0) {
		alert('Please select a site first.');
		return;
	}
	
	var server,serverParts,user,pass,port;
	
	switch(dialog.attr('id')) {
		case 'noteDialog':
			user = $('#noteForm .dialogInput:nth(1)').val();
			pass = $('#noteForm .dialogInput:nth(2)').val();
			server = getHostname($('#noteForm .dialogInput:nth(0)').val(), $('#noteForm .dialogInput:nth(3)').val());
			break;
		case 'siteDialog':
			break;
	}
	
	serverParts = server.split(":");
	if(serverParts.length > 1) {
		server = serverParts[0];
		port = serverParts[1];
	} else {
		port = 3389;
	}
	var rdpCmd = server + '///' + user + '///' + pass + '///' + port;
	
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
})()
