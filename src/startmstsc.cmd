:: Batch script for starting an RDP-session from a URI-protocol
:: see https://jorik90.github.io/lastpass-rdp-starter/
@echo off
setlocal
for /F "tokens=1,2,3,4,5 delims=///" %%a in ("%~1") do set server=%%b&set user=%%c&set pass=%%d&set port=%%e
if "%port%"=="" set port=3389
if "%server%"=="" goto Error
if "%user%"=="" goto Error
if "%pass%"=="" goto Error

set "passkey=TERMSRV/%server%"
cmdkey /generic:"%passkey%" /user:"%user%" /pass:"%pass%"
start mstsc /v "%server%:%port%"
timeout 10
cmdkey /delete:"%passkey%"

GOTO End

:Error
echo Expected 1 param with server, username and password seperated by ///. Example: server///user///pass[///port]
pause
:End
endlocal
exit
