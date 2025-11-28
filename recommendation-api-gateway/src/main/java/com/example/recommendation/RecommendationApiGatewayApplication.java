package com.example.recommendation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RecommendationApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendationApiGatewayApplication.class, args);
	}

}
