import { useState } from 'react';
import { BookGrid } from '../components/BookGrid';
import { SearchBar } from '../components/SearchBar';
import { useItemBasedRecommendations } from '../hooks/useRecommendations';
import { BookMarked, X } from 'lucide-react';

export const SimilarBooksPage = () => {
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [limit, setLimit] = useState(12);

    const { data: books, isLoading, error } = useItemBasedRecommendations(selectedBooks, limit);

    const handleAddBook = (query: string) => {
        if (query && !selectedBooks.includes(query)) {
            setSelectedBooks([...selectedBooks, query]);
        }
    };

    const handleRemoveBook = (book: string) => {
        setSelectedBooks(selectedBooks.filter((b) => b !== book));
    };

    const handleClear = () => {
        setSelectedBooks([]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <BookMarked className="w-8 h-8 text-primary-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Similar Books
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Find books similar to your favorites
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-6 max-w-2xl">
                    <SearchBar
                        onSearch={handleAddBook}
                        placeholder="Enter book title (e.g., 'Pride and Prejudice')"
                        buttonText="Add Book"
                    />
                </div>

                {/* Selected Books */}
                {selectedBooks.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-gray-700">
                                Selected Books ({selectedBooks.length}):
                            </h3>
                            <button
                                onClick={handleClear}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedBooks.map((book) => (
                                <div
                                    key={book}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 
                           rounded-lg border border-primary-200"
                                >
                                    <span className="text-sm font-medium">{book}</span>
                                    <button
                                        onClick={() => handleRemoveBook(book)}
                                        className="hover:bg-primary-100 rounded p-0.5"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Limit Control */}
                {selectedBooks.length > 0 && (
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mr-3">
                            Number of recommendations:
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
                {selectedBooks.length > 0 ? (
                    <BookGrid
                        books={books || []}
                        loading={isLoading}
                        error={error?.message}
                    />
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            Add book titles to find similar recommendations
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            You can add multiple books to get better recommendations
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
