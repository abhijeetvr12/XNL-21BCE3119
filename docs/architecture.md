# Architecture Overview

## Components
1. **Backend (Flask)**: REST API with `/health`, `/data`, and serves React app.
2. **Frontend (React)**: SPA dashboard with health status and coverage chart.
3. **CI/CD**: GitHub Actions for build, test, and coverage.
4. **Testing**: Unit (pytest) and E2E (Selenium).
5. **Monitoring**: Prometheus for request metrics.

## Diagram