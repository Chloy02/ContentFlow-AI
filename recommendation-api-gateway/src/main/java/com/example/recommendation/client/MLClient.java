package com.example.recommendation.client;

import com.example.recommendation.model.ItemDto;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
public class MLClient {

    private final WebClient webClient;

    public MLClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<ItemDto> getGlobalRecommendations(int limit) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/recommend/global")
                        .queryParam("limit", limit)
                        .build())
                .retrieve()
                .bodyToFlux(ItemDto.class)
                .collectList()
                .block(); // Blocking for simplicity in this phase, can be reactive later
    }

    public List<ItemDto> getUserRecommendations(Long userId, int limit) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/recommend/user/{userId}")
                        .queryParam("limit", limit)
                        .build(userId))
                .retrieve()
                .bodyToFlux(ItemDto.class)
                .collectList()
                .block();
    }

    public List<ItemDto> getRecommendationsByItems(List<String> itemIds, int limit) {
        return webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/recommend/by-items")
                        .queryParam("limit", limit)
                        .build())
                .bodyValue(Map.of("itemIds", itemIds))
                .retrieve()
                .bodyToFlux(ItemDto.class)
                .collectList()
                .block();
    }
}
