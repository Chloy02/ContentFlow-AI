import requests
import json

base_url = "http://localhost:8000"

def test_endpoint(name, method, url, data=None):
    print(f"\nTesting {name} ({url})...")
    try:
        if method == "GET":
            r = requests.get(url)
        else:
            r = requests.post(url, json=data)
        
        print(f"Status: {r.status_code}")
        if r.status_code == 200:
            resp = r.json()
            if isinstance(resp, list) and len(resp) > 0:
                print(f"Success! Got {len(resp)} items.")
                print(f"First item: {resp[0].get('title')} by {resp[0].get('authors')}")
            else:
                print("Response:", resp)
        else:
            print("Error:", r.text)
    except Exception as e:
        print(f"Exception: {e}")

test_endpoint("Health", "GET", f"{base_url}/health")
test_endpoint("Global Recommendations", "GET", f"{base_url}/recommend/global?limit=5")
test_endpoint("By Items (Harry Potter)", "POST", f"{base_url}/recommend/by-items", {"itemIds": ["Harry Potter"]})
