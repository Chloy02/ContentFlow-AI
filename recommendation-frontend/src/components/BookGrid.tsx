import { motion } from 'framer-motion';
import { AlertCircle, BookOpen } from 'lucide-react';
import type { Book } from '../types/book';
import { BookCard } from './BookCard';
import { SkeletonGrid } from './SkeletonLoader';

interface BookGridProps {
    books: Book[];
    loading?: boolean;
    error?: string;
    showScore?: boolean;
    onBookClick?: (book: Book) => void;
}

export const BookGrid = ({ books, loading = false, error, showScore = false, onBookClick }: BookGridProps) => {
    if (loading) {
        return <SkeletonGrid count={8} />;
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card border border-red-500/30 rounded-2xl p-8 text-center"
            >
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 font-semibold text-lg mb-2">Error loading recommendations</p>
                <p className="text-slate-400 text-sm">{error}</p>
            </motion.div>
        );
    }

    if (books.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-12 text-center"
            >
                <BookOpen className="w-16 h-16 text-primary-500/50 mx-auto mb-4" />
                <p className="text-slate-300 text-lg font-semibold mb-2">No recommendations found</p>
                <p className="text-slate-500 text-sm">Try different search criteria</p>
            </motion.div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6"
        >
            {books.map((book) => (
                <motion.div key={book.itemId} variants={item}>
                    <BookCard book={book} showScore={showScore} onBookClick={onBookClick} />
                </motion.div>
            ))}
        </motion.div>
    );
};
