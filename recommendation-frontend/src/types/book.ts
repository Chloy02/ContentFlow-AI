export interface Book {
    itemId: string;
    title: string;
    authors: string[] | null;
    description: string | null;
    thumbnail: string | null;
    averageRating: number | null;
    ratingsCount: number | null;
    score: number | null;
}

export interface ItemIdRequest {
    itemIds: string[];
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}
