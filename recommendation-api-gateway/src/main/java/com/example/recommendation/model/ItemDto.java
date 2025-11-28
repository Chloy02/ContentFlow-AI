package com.example.recommendation.model;

import java.io.Serializable;
import java.util.List;

public class ItemDto implements Serializable {
    private String itemId;
    private String title;
    private List<String> authors;
    private String description;
    private String thumbnail;
    private Double averageRating;
    private Integer ratingsCount;
    private Double score;

    public ItemDto() {}

    public ItemDto(String itemId, String title, List<String> authors, String description, String thumbnail, Double averageRating, Integer ratingsCount, Double score) {
        this.itemId = itemId;
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.thumbnail = thumbnail;
        this.averageRating = averageRating;
        this.ratingsCount = ratingsCount;
        this.score = score;
    }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<String> getAuthors() { return authors; }
    public void setAuthors(List<String> authors) { this.authors = authors; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getRatingsCount() { return ratingsCount; }
    public void setRatingsCount(Integer ratingsCount) { this.ratingsCount = ratingsCount; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}
