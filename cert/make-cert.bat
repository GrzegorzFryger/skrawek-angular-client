@echo off

cd cert

openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 30 out localhost.crt -config certificate.cnf

echo.
echo -----
echo The certificate was provided.
echo.
pause
