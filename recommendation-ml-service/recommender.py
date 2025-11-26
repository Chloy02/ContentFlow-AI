import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from google_books_client import GoogleBooksClient

class Recommender:
    def __init__(self):
        self.books_df = None
        self.ratings_df = None
        self.user_item_matrix = None
        self.item_similarity_df = None
        self.google_books = GoogleBooksClient()

    def load_data(self):
        # Load dummy data for Collaborative Filtering matrix
        self.books_df = pd.read_csv("data/books.csv")
        self.ratings_df = pd.read_csv("data/ratings.csv")
        print("Data loaded successfully.")

    def get_global_recommendations(self, limit=10):
        # Fetch "popular" or trending books from Google Books
        # Since Google Books doesn't have a simple "trending" endpoint, we can search for a broad term like "subject:fiction" and sort by relevance (default) or try to filter.
        # For now, let's search for "bestsellers" or a generic term.
        print("Fetching global recommendations from Google Books...")
        return self.google_books.search_books("subject:fiction", limit=limit)

    def train_item_based_model(self):
        # Create user-item matrix
        self.user_item_matrix = self.ratings_df.pivot_table(index='userId', columns='itemId', values='rating').fillna(0)
        
        # Compute item-item cosine similarity
        item_matrix = self.user_item_matrix.T
        similarity_matrix = cosine_similarity(item_matrix)
        
        self.item_similarity_df = pd.DataFrame(similarity_matrix, index=item_matrix.index, columns=item_matrix.index)
        print("Item-based model trained.")

    def get_user_recommendations(self, user_id, limit=10):
        # For existing dummy users, we use the CF model
        if user_id not in self.user_item_matrix.index:
            return self.get_global_recommendations(limit)

        # Get user's ratings
        user_ratings = self.user_item_matrix.loc[user_id]
        liked_items = user_ratings[user_ratings > 0].index.tolist()
        
        similar_scores = pd.Series(dtype=float)
        
        for item_id in liked_items:
            # Get similar items
            if item_id in self.item_similarity_df.index:
                sim_items = self.item_similarity_df[item_id]
                rating = user_ratings[item_id]
                similar_scores = similar_scores.add(sim_items * rating, fill_value=0)
        
        # Remove items already rated by user
        similar_scores = similar_scores.drop(liked_items, errors='ignore')
        
        # Sort
        top_items = similar_scores.sort_values(ascending=False).head(limit)
        
        # Format result
        recommendations = []
        for item_id, score in top_items.items():
            # Try to get details from our dummy CSV first
            book_row = self.books_df[self.books_df['itemId'] == item_id]
            if not book_row.empty:
                book_info = book_row.iloc[0].to_dict()
                # Try to enrich with Google Books? (Optional, might be slow/inaccurate matching)
                # For now, just return the dummy info + score
                book_info['score'] = score
                recommendations.append(book_info)
            
        return recommendations

    def get_recommendations_by_items(self, item_ids, limit=10):
        # If item_ids are Google Book IDs (strings), we need a different approach.
        # If they are our dummy IDs (ints), we use the matrix.
        
        # Assuming for this "Real Data" phase, the user might send Google Book IDs or search queries.
        # But to keep it simple:
        # If we receive a list of book titles or IDs, we can search for similar books on Google Books.
        
        # Let's assume the input is a list of query strings (titles) for now, or we just search for similar categories.
        # Actually, let's implement a "more like this" using Google Books API by searching for the author or category of the first item.
        
        if not item_ids:
            return []
            
        # Treat the first item as a search query if it's a string
        query = str(item_ids[0])
        print(f"Searching for recommendations similar to: {query}")
        
        # First, search for the book to get its metadata (author, category)
        books = self.google_books.search_books(query, limit=1)
        if not books:
            return []
            
        book = books[0]
        authors = book.get('authors', [])
        if authors:
            # Search for other books by this author
            author_query = f"inauthor:{authors[0]}"
            return self.google_books.search_books(author_query, limit=limit)
        else:
            # Fallback: just return the search results for the title
            return self.google_books.search_books(query, limit=limit)
