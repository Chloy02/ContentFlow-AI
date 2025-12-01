import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { LoadingSpinner } from './LoadingSpinner';

interface BookGridProps {
    books: Book[];
    loading?: boolean;
    error?: string;
    showScore?: boolean;
}

export const BookGrid = ({ books, loading = false, error, showScore = false }: BookGridProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-medium">Error loading recommendations</p>
                <p className="text-red-500 text-sm mt-2">{error}</p>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No recommendations found</p>
                <p className="text-gray-500 text-sm mt-2">Try different search criteria</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookCard key={book.itemId} book={book} showScore={showScore} />
            ))}
        </div>
    );
};
