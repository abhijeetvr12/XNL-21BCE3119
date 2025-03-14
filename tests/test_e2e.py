import pytest
from selenium import webdriver
from backend.app import create_app
import threading

@pytest.fixture(scope="module")
def app():
    app = create_app()
    thread = threading.Thread(target=app.run, kwargs={'debug': False, 'port': 5000})
    thread.daemon = True
    thread.start()
    yield app

def test_dashboard(app):
    driver = webdriver.Chrome()
    driver.get("http://localhost:5000/")
    assert "CI/CD Dashboard" in driver.page_source
    driver.quit()