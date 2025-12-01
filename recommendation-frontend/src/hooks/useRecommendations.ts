import { useQuery } from '@tanstack/react-query';
import {
    getGlobalRecommendations,
    getUserRecommendations,
    getItemBasedRecommendations,
} from '../api/recommendations';

/**
 * Hook for fetching global recommendations
 */
export const useGlobalRecommendations = (limit: number = 10) => {
    return useQuery({
        queryKey: ['recommendations', 'global', limit],
        queryFn: () => getGlobalRecommendations(limit),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};

/**
 * Hook for fetching user-specific recommendations
 */
export const useUserRecommendations = (userId: number | null, limit: number = 10) => {
    return useQuery({
        queryKey: ['recommendations', 'user', userId, limit],
        queryFn: () => {
            if (!userId) throw new Error('User ID is required');
            return getUserRecommendations(userId, limit);
        },
        enabled: userId !== null && userId > 0,
        staleTime: 3 * 60 * 1000, // 3 minutes
        retry: 2,
    });
};

/**
 * Hook for fetching item-based recommendations
 */
export const useItemBasedRecommendations = (itemIds: string[], limit: number = 10) => {
    return useQuery({
        queryKey: ['recommendations', 'items', itemIds, limit],
        queryFn: () => getItemBasedRecommendations(itemIds, limit),
        enabled: itemIds.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};
