import { apiClient } from './client';
import { Book, ItemIdRequest } from '../types/book';

/**
 * Fetch global recommendations (trending/popular books)
 */
export const getGlobalRecommendations = async (limit: number = 10): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/recommendations/global', {
        params: { limit },
    });
    return response.data;
};

/**
 * Fetch user-specific recommendations
 */
export const getUserRecommendations = async (
    userId: number,
    limit: number = 10
): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>(`/recommendations/users/${userId}`, {
        params: { limit },
    });
    return response.data;
};

/**
 * Fetch item-based recommendations (similar books)
 */
export const getItemBasedRecommendations = async (
    itemIds: string[],
    limit: number = 10
): Promise<Book[]> => {
    const payload: ItemIdRequest = { itemIds };
    const response = await apiClient.post<Book[]>('/recommendations/by-items', payload, {
        params: { limit },
    });
    return response.data;
};
