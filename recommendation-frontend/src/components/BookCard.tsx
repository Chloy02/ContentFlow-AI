import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Book } from '../types/book';
import { Star, User, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

interface BookCardProps {
    book: Book;
    showScore?: boolean;
    onBookClick?: (book: Book) => void;
}

export const BookCard = ({ book, showScore = false, onBookClick }: BookCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

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

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'from-amber-400 to-yellow-500';
        if (rating >= 4) return 'from-yellow-400 to-amber-500';
        if (rating >= 3.5) return 'from-orange-400 to-yellow-500';
        return 'from-gray-400 to-gray-500';
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative glass-card rounded-2xl overflow-hidden border border-primary-500/20 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer h-full"
            onClick={() => onBookClick?.(book)}
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300 pointer-events-none z-10"></div>

            {/* Book Cover */}
            <div className="relative overflow-hidden">
                {!imageError && book.thumbnail ? (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 shimmer"></div>
                        )}
                        <motion.img
                            src={book.thumbnail}
                            alt={book.title}
                            className={`w-full h-64 sm:h-72 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                        {/* Gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                    </>
                ) : (
                    <div className="w-full h-64 sm:h-72 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 shimmer"></div>
                        <div className="text-center relative z-10">
                            <Sparkles className="w-12 h-12 text-primary-500/50 mx-auto mb-2 animate-float" />
                            <span className="text-slate-500 text-sm font-medium">No Cover</span>
                        </div>
                    </div>
                )}

                {/* Rating Badge */}
                {book.averageRating && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 glass rounded-full border border-white/20 shadow-lg z-20"
                    >
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-white text-sm font-bold">
                            {book.averageRating.toFixed(1)}
                        </span>
                    </motion.div>
                )}

                {/* Score Badge */}
                {showScore && book.score !== null && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-4 left-4 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-lg border border-white/20 z-20"
                    >
                        <div className="flex items-center gap-1.5">
                            <TrendingUp size={14} className="text-white" />
                            <span className="text-white text-xs font-bold">
                                {Math.round(book.score * 100)}%
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Book Info */}
            <div className="relative p-4 sm:p-5 z-20 space-y-3">
                <motion.h3
                    className="text-base sm:text-lg font-bold text-white line-clamp-2 font-heading group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 group-hover:bg-clip-text transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {book.title}
                </motion.h3>

                <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                    <User size={14} className="text-primary-400 flex-shrink-0" />
                    <span className="line-clamp-1">{displayAuthors()}</span>
                </p>

                {/* Ratings Count */}
                {book.ratingsCount && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Star size={12} className="text-accent-400" />
                        {book.ratingsCount.toLocaleString()} ratings
                    </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {truncateText(book.description, 120)}
                </p>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookClick?.(book);
                    }}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/30 flex items-center justify-center gap-2 text-sm"
                >
                    <BookOpen size={16} />
                    View Details
                </motion.button>
            </div>
        </motion.div>
    );
};
