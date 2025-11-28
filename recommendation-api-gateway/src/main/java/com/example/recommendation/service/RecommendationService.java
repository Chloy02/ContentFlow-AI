package com.example.recommendation.service;

import com.example.recommendation.client.MLClient;
import com.example.recommendation.model.ItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final MLClient mlClient;

    public RecommendationService(MLClient mlClient) {
        this.mlClient = mlClient;
    }

    @Cacheable(value = "globalRecommendations", key = "#limit")
    public List<ItemDto> getGlobalRecommendations(int limit) {
        return mlClient.getGlobalRecommendations(limit);
    }

    @Cacheable(value = "userRecommendations", key = "#userId + '-' + #limit")
    public List<ItemDto> getUserRecommendations(Long userId, int limit) {
        return mlClient.getUserRecommendations(userId, limit);
    }

    // Not caching by-items for now as combinations are infinite, but could cache common queries
    public List<ItemDto> getRecommendationsByItems(List<String> itemIds, int limit) {
        return mlClient.getRecommendationsByItems(itemIds, limit);
    }
}
