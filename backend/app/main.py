from flask import Blueprint, jsonify, send_from_directory
from prometheus_client import Counter, Gauge, start_http_server
import os
import time
import random

main_bp = Blueprint('main', __name__)

# Prometheus metrics
REQUESTS = Counter('requests_total', 'Total requests')
UPTIME = Gauge('app_uptime_seconds', 'Application uptime in seconds')
start_time = time.time()  # Record start time
start_http_server(random.randint(8000, 9000))

@main_bp.route('/health')
def health():
    REQUESTS.inc()
    UPTIME.set(time.time() - start_time)
    return jsonify({"status": "ok"})

@main_bp.route('/data')
def data():
    REQUESTS.inc()
    UPTIME.set(time.time() - start_time)
    return jsonify({"message": "Sample data", "value": 42})

@main_bp.route('/metrics')
def metrics():
    uptime = time.time() - start_time
    return jsonify({
        "request_count": REQUESTS._value.get(),  # Get current request count
        "uptime_seconds": uptime,
        "active_users": 10  # Static for demo; could be dynamic
    })

@main_bp.route('/', defaults={'path': ''})
@main_bp.route('/<path:path>')
def serve_react(path):
    if path and os.path.exists(os.path.join(main_bp.root_path, '../../frontend/build', path)):
        return send_from_directory(os.path.join(main_bp.root_path, '../../frontend/build'), path)
    return send_from_directory(os.path.join(main_bp.root_path, '../../frontend/build'), 'index.html')