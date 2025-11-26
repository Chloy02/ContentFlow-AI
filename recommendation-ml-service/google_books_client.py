import requests

class GoogleBooksClient:
    def __init__(self):
        self.base_url = "https://www.googleapis.com/books/v1/volumes"

    def search_books(self, query, limit=10):
        params = {
            "q": query,
            "maxResults": limit,
            "printType": "books"
        }
        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            books = []
            if "items" in data:
                for item in data["items"]:
                    info = item.get("volumeInfo", {})
                    books.append({
                        "itemId": item.get("id"), # Use Google Books ID
                        "title": info.get("title"),
                        "authors": info.get("authors", []),
                        "description": info.get("description"),
                        "thumbnail": info.get("imageLinks", {}).get("thumbnail"),
                        "averageRating": info.get("averageRating"),
                        "ratingsCount": info.get("ratingsCount")
                    })
            return books
        except Exception as e:
            print(f"Error fetching from Google Books: {e}")
            return []

    def get_book_details(self, volume_id):
        url = f"{self.base_url}/{volume_id}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            item = response.json()
            info = item.get("volumeInfo", {})
            return {
                "itemId": item.get("id"),
                "title": info.get("title"),
                "authors": info.get("authors", []),
                "description": info.get("description"),
                "thumbnail": info.get("imageLinks", {}).get("thumbnail"),
                "averageRating": info.get("averageRating"),
                "ratingsCount": info.get("ratingsCount")
            }
        except Exception as e:
            print(f"Error fetching book details: {e}")
            return None
