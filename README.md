# LastPass RDP starter
This "utility" combines a few techniques to be able to start a RDP-session directly from your LastPass vault in Google Chrome under Windows.

# Update september 2018
It looks like it is no longer possible to exeucte Javascript using a bookmarklet in an extension. To work around this, I've created a very basic Chrome developer tools extension. This adds an entry 'Lastpass RDP starter' to the developer tools. Starting a RDP session is a bit harder: you have to press F12 and click on the 'Lastpass RDP starter'-tab in the devtools. The URI-protocol and cmd script are still required.

## Installation
Steps for installation can be found on the generated HTML file hosted here: https://jorik90.github.io/lastpass-rdp-starter/.

The installation requires three steps: adding the bookmarklet, saving the .cmd somewhere on the local filesystem and execute a reg-file to register the rdp-uri-protocol.

## Technical details
There is a bookmarklet containing some JavaScript that reads the current page. If it's a site in your LastPass-vault, it will open a new window with the details necassary for starting the RDP-session. The window will launch a link with a custom URI-protcol, which will trigger the .cmd script. (addition sept 2018: the bookmarklet doesn't work anymore, use the extension)

URI-protocol is registered according the the documentation of Microsoft described on [MSDN](https://msdn.microsoft.com/en-us/library/aa767914%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396).

The .cmd script used [cmdkey (MSDN)](https://technet.microsoft.com/nl-nl/library/cc754243(v=ws.11).aspx) to temporary store the credentials, and [mstsc (MSDN)](https://technet.microsoft.com/nl-nl/library/cc753907(v=ws.10).aspx) to start the RDP-session. The credentials are stored for 10 seconds allowing the user to click on any possible confirmation dialogs presented by mstsc.

The credentials are not stored in the browser history because they're injected by some JavaScript on the page using the bookmarklet.
