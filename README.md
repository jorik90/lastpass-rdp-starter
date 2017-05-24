# LastPass RDP starter
This "utility" combines a few techniques to be able to start a RDP-session directly from your LastPass vault in Google Chrome under Windows.

## Installation
Steps for installation can be found on the generated HTML file hosted here: https://jorik90.github.io/lastpass-rdp-starter/.

The installation requires three steps: adding the bookmarklet, saving the .cmd somewhere on the local filesystem and execute a reg-file to register the rdp-uri-protocol.

## Technical details
There is a bookmarklet containing some JavaScript that reads the current page. If it's a site in your LastPass-vault, it will open a new window with the details necassary for starting the RDP-session. The window will launch a link with a custom URI-protcol, which will trigger the .cmd script.

URI-protocol is registered according the the documentation of Microsoft described on [MSDN](https://msdn.microsoft.com/en-us/library/aa767914%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396).

The .cmd script used [cmdkey (MSDN)](https://technet.microsoft.com/nl-nl/library/cc754243(v=ws.11).aspx) to temporary store the credentials, and [mstsc (MSDN)](https://technet.microsoft.com/nl-nl/library/cc753907(v=ws.10).aspx) to start the RDP-session. The credentials are stored for 10 seconds allowing the user to click on any possible confirmation dialogs presented by mstsc.

The credentials are not stored in the browser history because they're injected by some JavaScript on the page using the bookmarklet.
