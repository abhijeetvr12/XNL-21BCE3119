# XNL-21BCE3119-SDE-8

## Overview
A CI/CD pipeline with a Flask backend and React frontend, featuring automated tests and monitoring.

## Setup
1. **Backend**:
   - `cd backend && pip install -r requirements.txt`
   - `python -m app`
2. **Frontend** (optional for dev):
   - `cd frontend && npm install && npm start`
3. **Tests**: `cd backend && pytest --cov=./app`
4. **Docker**:
   - Backend: `cd backend && docker build -t xnl-backend . && docker run -p 5000:5000 xnl-backend`
   - Frontend build is served by backend.

## Features
- Flask API: `/health`, `/data`.
- React dashboard at `/` showing health status and test coverage.
- GitHub Actions CI/CD.
- Prometheus monitoring at `http://localhost:8000`.

## Demo
