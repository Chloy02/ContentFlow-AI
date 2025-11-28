import { useState } from 'react';
import { BookGrid } from '../components/BookGrid';
import { SearchBar } from '../components/SearchBar';
import { useUserRecommendations } from '../hooks/useRecommendations';
import { UserCircle } from 'lucide-react';

export const UserPage = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [limit, setLimit] = useState(12);

    const { data: books, isLoading, error } = useUserRecommendations(userId, limit);

    const handleSearch = (query: string) => {
        const id = parseInt(query);
        if (!isNaN(id) && id > 0) {
            setUserId(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <UserCircle className="w-8 h-8 text-primary-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Recommendations
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Get personalized book recommendations based on user preferences
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-6 max-w-2xl">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Enter User ID (e.g., 1, 2, 3...)"
                        buttonText="Get Recommendations"
                    />
                    {userId && (
                        <p className="mt-2 text-sm text-gray-600">
                            Showing recommendations for User ID: <span className="font-semibold">{userId}</span>
                        </p>
                    )}
                </div>

                {/* Limit Control */}
                {userId && (
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
                )}

                {/* Results */}
                {userId ? (
                    <BookGrid
                        books={books || []}
                        loading={isLoading}
                        error={error?.message}
                        showScore={true}
                    />
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <UserCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            Enter a User ID to see personalized recommendations
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
