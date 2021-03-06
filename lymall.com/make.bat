@echo off
@rem #"Makefile" for Windows projects.
@rem #Copyright (c) http://www.atisafe.com/, 2015. All rights reserved.
@rem
SETLOCAL

@rem ###############
@rem # PRINT USAGE #
@rem ###############

if [%1]==[] goto usage

@rem ################
@rem # SWITCH BLOCK #
@rem ################

@rem # make build
if /I [%1]==[build] call :build

@rem # make build
if /I [%1]==[linux_build] call :linux_build

@rem # make build
if /I [%1]==[windows_build] call :windows_build

@rem # make clean
if /I [%1]==[clean] call :clean

goto :eof

@rem #############
@rem # FUNCTIONS #
@rem #############
:build
for /f "delims=" %%i in ('go version') do (set go_version=%%i)
for /f "delims=" %%i in ('git rev-parse HEAD') do (set git_hash=%%i)
@go build  -o ./lymall.exe ./
exit /B %ERRORLEVEL%

:linux_build
for /f "delims=" %%i in ('go version') do (set go_version=%%i)
for /f "delims=" %%i in ('git rev-parse HEAD') do (set git_hash=%%i)
SET CGO_ENABLED=0
set GOARCH=amd64
set GOOS=linux
@go build -o ./lymall ./
exit /B %ERRORLEVEL%

:darwin_build
for /f "delims=" %%i in ('go version') do (set go_version=%%i)
for /f "delims=" %%i in ('git rev-parse HEAD') do (set git_hash=%%i)
SET CGO_ENABLED=0
set GOARCH=amd64
set GOOS=darwin
@go build -o ./build/lymall ./
exit /B %ERRORLEVEL%

:clean
@del /S /F /Q "build\lymall*"
@del /S /F /Q "build\logs\*.log"
exit /B 0

:usage
@echo Usage: %0 ^[ build ^| linux_build ^| windows_build ^| clean ^]
exit /B 1