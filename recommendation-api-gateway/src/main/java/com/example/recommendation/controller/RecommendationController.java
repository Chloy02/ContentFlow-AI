package com.example.recommendation.controller;

import com.example.recommendation.model.ItemDto;
import com.example.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/global")
    public List<ItemDto> getGlobalRecommendations(@RequestParam(defaultValue = "10") int limit) {
        return recommendationService.getGlobalRecommendations(limit);
    }

    @GetMapping("/users/{userId}")
    public List<ItemDto> getUserRecommendations(@PathVariable Long userId, @RequestParam(defaultValue = "10") int limit) {
        return recommendationService.getUserRecommendations(userId, limit);
    }

    @PostMapping("/by-items")
    public List<ItemDto> getRecommendationsByItems(@RequestBody Map<String, List<String>> payload, @RequestParam(defaultValue = "10") int limit) {
        List<String> itemIds = payload.get("itemIds");
        return recommendationService.getRecommendationsByItems(itemIds, limit);
    }
}
