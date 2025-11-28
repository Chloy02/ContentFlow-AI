# AI-Powered Content Recommendation Platform

A microservices-based book recommendation system that combines collaborative filtering, content-based filtering, and real-time data from Google Books API. Built with Spring Boot, Python FastAPI, and Redis caching.

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │ (Phase 3 - Upcoming)
│   (Port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Spring Boot Gateway    │
│      (Port 8080)        │
│  - REST API             │
│  - Redis Caching        │
│  - Service Orchestration│
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐      ┌──────────────┐
│   ML Service (Python)   │◄─────┤    Redis     │
│      (Port 8000)        │      │  (Port 6379) │
│  - FastAPI              │      └──────────────┘
│  - Collaborative Filter │
│  - Google Books API     │
└─────────────────────────┘
```

## 🚀 Tech Stack

### Backend Services
- **API Gateway**: Spring Boot 3.2.3 (Java 17+)
- **ML Service**: Python 3.11 + FastAPI
- **Cache**: Redis
- **Build Tools**: Maven, pip

### ML & Data
- **Collaborative Filtering**: User-item matrix with cosine similarity
- **Content-Based**: Google Books API integration
- **Libraries**: pandas, scikit-learn, requests

## 📋 Prerequisites

- **Docker & Docker Compose** (recommended)
- **OR** Local setup:
  - Java 17+ (JDK)
  - Python 3.11+
  - Maven 3.6+
  - Redis (via Docker or local)

## 🔧 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services will be available at:
- API Gateway: http://localhost:8080
- ML Service: http://localhost:8000
- Redis: localhost:6379

### Option 2: Local Development

#### 1. Start Redis
```bash
docker run --name recommendation-redis -d -p 6379:6379 redis
```

#### 2. Start ML Service
```bash
cd recommendation-ml-service
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### 3. Start API Gateway
```bash
cd recommendation-api-gateway
mvn spring-boot:run
```

## 📚 API Endpoints

### Spring Boot API Gateway (Port 8080)

#### Get Global Recommendations
```bash
GET /api/recommendations/global?limit=10
```
Returns popular/trending books from Google Books.

#### Get User-Specific Recommendations
```bash
GET /api/recommendations/users/{userId}?limit=10
```
Returns personalized recommendations using collaborative filtering.

#### Get Item-Based Recommendations
```bash
POST /api/recommendations/by-items?limit=10
Content-Type: application/json

{
  "itemIds": ["book_title_1", "book_title_2"]
}
```
Returns books similar to the provided items.

### ML Service Direct Access (Port 8000)

```bash
# Health check
GET /health

# Global recommendations
GET /recommend/global?limit=10

# User recommendations
GET /recommend/user/{user_id}?limit=10

# Item-based recommendations
POST /recommend/by-items?limit=10
```

## 🧪 Testing

```bash
# Test global recommendations
curl "http://localhost:8080/api/recommendations/global?limit=5"

# Test user recommendations
curl "http://localhost:8080/api/recommendations/users/1?limit=5"

# Test item-based recommendations
curl -X POST -H "Content-Type: application/json" \
  -d '{"itemIds": ["Pride and Prejudice"]}' \
  "http://localhost:8080/api/recommendations/by-items?limit=5"
```

## 📁 Project Structure

```
AI_Powered_Content_Recommendation/
├── recommendation-api-gateway/       # Spring Boot service
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/recommendation/
│   │       │       ├── client/      # ML service client
│   │       │       ├── config/      # Redis, WebClient config
│   │       │       ├── controller/  # REST controllers
│   │       │       ├── model/       # DTOs
│   │       │       └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── recommendation-ml-service/        # Python ML service
│   ├── data/                         # Training data (CSV)
│   ├── google_books_client.py        # Google Books integration
│   ├── recommender.py                # ML algorithms
│   ├── main.py                       # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
│
└── docker-compose.yml                # Full stack orchestration
```

## 🔑 Environment Configuration

### API Gateway (application.properties)
```properties
server.port=8080
spring.data.redis.host=localhost
spring.data.redis.port=6379
ml-service.base-url=http://localhost:8000
spring.cache.redis.time-to-live=600000
```

### ML Service
Create `.env` file in `recommendation-ml-service/`:
```env
GOOGLE_BOOKS_API_KEY=your_api_key_here  # Optional
```

## 🎯 Features

### Current (Phase 2 Complete)
- ✅ RESTful API Gateway with Spring Boot
- ✅ Redis caching for performance
- ✅ Python ML service with FastAPI
- ✅ Collaborative filtering (user-item matrix)
- ✅ Content-based filtering (Google Books)
- ✅ Docker containerization
- ✅ Docker Compose orchestration

### Upcoming (Phase 3)
- 🔲 React frontend with modern UI
- 🔲 User authentication
- 🔲 Real-time recommendations
- 🔲 Advanced analytics dashboard

## 🛠️ Development

### Add New Recommendation Algorithm
1. Implement in `recommendation-ml-service/recommender.py`
2. Add endpoint in `main.py`
3. Add client method in `MLClient.java`
4. Add service method in `RecommendationService.java`
5. Expose via controller

### Debug Services
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs ml-service
docker-compose logs api-gateway

# Restart a service
docker-compose restart api-gateway
```

## 📊 Sample Response

```json
[
  {
    "itemId": "icKmd-tlvPMC",
    "title": "Journey to the Center of the Earth",
    "authors": ["Jules Verne"],
    "description": "The intrepid Professor Lindenbrock...",
    "thumbnail": "http://books.google.com/books/...",
    "averageRating": 3.5,
    "ratingsCount": 3,
    "score": null
  }
]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Chloy Costa** - *Initial work*

## 🙏 Acknowledgments

- Google Books API for real-world book data
- Spring Boot community
- FastAPI framework
