import { useState } from 'react';
import { BookGrid } from '../components/BookGrid';
import { useGlobalRecommendations } from '../hooks/useRecommendations';
import { TrendingUp } from 'lucide-react';

export const HomePage = () => {
    const [limit, setLimit] = useState(12);
    const { data: books, isLoading, error } = useGlobalRecommendations(limit);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-8 h-8 text-primary-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Trending Recommendations
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Discover popular and trending books curated just for you
                    </p>
                </div>

                {/* Limit Control */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mr-3">
                        Number of books:
                    </label>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value={6}>6 books</option>
                        <option value={12}>12 books</option>
                        <option value={24}>24 books</option>
                    </select>
                </div>

                {/* Book Grid */}
                <BookGrid
                    books={books || []}
                    loading={isLoading}
                    error={error?.message}
                />
            </div>
        </div>
    );
};
