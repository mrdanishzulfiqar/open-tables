@echo off
title OPEN TABLES - Local Server
echo ====================================================
echo Starting OPEN TABLES Restaurant Web Application...
echo Address: 12 Canal Rd, Lahore
echo Helpline: 03224710141
echo.
echo Opening: http://localhost:3000
echo Owner Portal: http://localhost:3000/admin/
echo ====================================================
start http://localhost:3000
python -m http.server 3000
pause
