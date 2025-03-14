from backend.app import create_app

def test_health_endpoint():
    app = create_app()
    client = app.test_client()
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json == {"status": "ok"}

def test_data_endpoint():
    app = create_app()
    client = app.test_client()
    response = client.get('/data')
    assert response.status_code == 200
    assert response.json["value"] == 42

def test_metrics_endpoint():
    app = create_app()
    client = app.test_client()
    response = client.get('/metrics')
    assert response.status_code == 200
    assert "request_count" in response.json
    assert "uptime_seconds" in response.json
    assert "active_users" in response.json