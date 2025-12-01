import type { Book } from '../types/book';
import { Star, User } from 'lucide-react';

interface BookCardProps {
    book: Book;
    showScore?: boolean;
}

export const BookCard = ({ book, showScore = false }: BookCardProps) => {
    const truncateText = (text: string | null, maxLength: number): string => {
        if (!text) return 'No description available';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const displayAuthors = (): string => {
        if (!book.authors || book.authors.length === 0) return 'Unknown Author';
        if (book.authors.length === 1) return book.authors[0];
        return `${book.authors[0]} ${book.authors.length > 1 ? `+${book.authors.length - 1} more` : ''}`;
    };

    return (
        <div className="card p-4 flex flex-col h-full">
            {/* Book Cover */}
            <div className="mb-4">
                {book.thumbnail ? (
                    <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-full h-64 object-cover rounded-md"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                        }}
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">No Cover Available</span>
                    </div>
                )}
            </div>

            {/* Book Info */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <User size={14} />
                    {displayAuthors()}
                </p>

                {/* Rating */}
                {book.averageRating && (
                    <div className="flex items-center gap-1 mb-2">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                            {book.averageRating.toFixed(1)}
                        </span>
                        {book.ratingsCount && (
                            <span className="text-xs text-gray-500">
                                ({book.ratingsCount.toLocaleString()} ratings)
                            </span>
                        )}
                    </div>
                )}

                {/* Recommendation Score */}
                {showScore && book.score !== null && (
                    <div className="mb-2">
                        <div className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
                            Score: {book.score.toFixed(2)}
                        </div>
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                    {truncateText(book.description, 150)}
                </p>
            </div>

            {/* Action Button */}
            <button
                onClick={() => {
                    // Future: Link to book details page or external URL
                    console.log('View book details:', book.itemId);
                }}
                className="btn-primary w-full"
            >
                More Info
            </button>
        </div>
    );
};
