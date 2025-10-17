@echo off
echo Starting ImmoGlam...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install it first.
    exit /b 1
)

REM Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it first.
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install Backend
echo Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install -q -r requirements.txt
cd ..

REM Install Frontend
echo Frontend...
cd frontend
if not exist node_modules (
    npm install --silent
)
cd ..

echo.
echo Installation complete!
echo.
echo Starting servers...
echo.

REM Start Backend
cd backend
call venv\Scripts\activate
start cmd /k python main.py
cd ..

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
cd frontend
start cmd /k npm run dev
cd ..

echo.
echo ImmoGlam is now running!
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press any key to open the browser...
pause >nul

start http://localhost:5173
