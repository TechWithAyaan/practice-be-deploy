@echo off
REM VERCEL DEPLOYMENT PRE-FLIGHT CHECKLIST (Windows)

echo.
echo ================================================================
echo VERCEL DEPLOYMENT VERIFICATION - Windows
echo ================================================================
echo.

echo [1/7] Checking jsonwebtoken in package.json...
findstr /M "jsonwebtoken" package.json >nul
if %errorlevel% equ 0 (
    echo ✅ jsonwebtoken found in package.json
) else (
    echo ❌ jsonwebtoken NOT found - FIX REQUIRED
)
echo.

echo [2/7] Checking build script in package.json...
findstr /M "build" package.json >nul
if %errorlevel% equ 0 (
    echo ✅ Build script found
) else (
    echo ❌ Build script NOT found - FIX REQUIRED
)
echo.

echo [3/7] Checking vercel.json buildCommand...
findstr /M "buildCommand" vercel.json >nul
if %errorlevel% equ 0 (
    echo ✅ buildCommand found in vercel.json
) else (
    echo ❌ buildCommand NOT found - FIX REQUIRED
)
echo.

echo [4/7] Checking node_modules\jsonwebtoken...
if exist node_modules\jsonwebtoken (
    echo ✅ jsonwebtoken installed locally
) else (
    echo ❌ jsonwebtoken NOT installed - Run: npm install
)
echo.

echo [5/7] Checking package-lock.json...
if exist package-lock.json (
    echo ✅ package-lock.json exists
) else (
    echo ❌ package-lock.json missing - Run: npm install
)
echo.

echo [6/7] Checking .gitignore...
findstr /M "node_modules" .gitignore >nul
if %errorlevel% equ 0 (
    echo ✅ node_modules in .gitignore (correct)
) else (
    echo ❌ node_modules NOT in .gitignore
)
echo.

echo [7/7] Checking server.js exports app...
findstr /M "export default app" server.js >nul
if %errorlevel% equ 0 (
    echo ✅ server.js exports app
) else (
    echo ❌ server.js does NOT export app - FIX REQUIRED
)
echo.

echo ================================================================
echo ALL CHECKS COMPLETED
echo ================================================================
echo.
echo NEXT STEPS:
echo 1. git add .
echo 2. git commit -m "Fix Vercel deployment: lock versions, add buildCommand"
echo 3. git push origin main
echo 4. Monitor deployment at: https://vercel.com/dashboard
echo.
pause
