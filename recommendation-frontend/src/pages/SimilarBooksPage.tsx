import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookGrid } from '../components/BookGrid';
import { BookCarousel } from '../components/BookCarousel';
import { SearchBar } from '../components/SearchBar';
import { BookDetailModal } from '../components/BookDetailModal';
import { useItemBasedRecommendations } from '../hooks/useRecommendations';
import { BookMarked, X, Layers, Shuffle, Sparkles, Library } from 'lucide-react';
import type { Book } from '../types/book';

export const SimilarBooksPage = () => {
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [limit, setLimit] = useState(20);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

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

    const handleSurpriseMe = () => {
        const sampleBooks = [
            'Harry Potter',
            'The Lord of the Rings',
            'Pride and Prejudice',
            'To Kill a Mockingbird',
            '1984',
            'The Great Gatsby',
        ];
        const randomBook = sampleBooks[Math.floor(Math.random() * sampleBooks.length)];
        if (!selectedBooks.includes(randomBook)) {
            setSelectedBooks([...selectedBooks, randomBook]);
        }
    };

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const topSimilar = books?.slice(0, 8) || [];
    const moreSimilar = books?.slice(8) || [];

    return (
        <div className="min-h-screen">
            <div className="container py-8 sm:py-12 space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                            <BookMarked className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading">
                                Find Similar Books
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base">
                                Discover books similar to your favorites
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl"
                >
                    <div className="glass-card p-6 rounded-2xl border border-primary-500/20 space-y-4">
                        <SearchBar
                            onSearch={handleAddBook}
                            placeholder="Enter book title (e.g., 'Pride and Prejudice')"
                            buttonText="Add Book"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSurpriseMe}
                            className="w-full px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-accent-500/30"
                        >
                            <Shuffle className="w-5 h-5" />
                            Surprise Me!
                        </motion.button>
                    </div>
                </motion.div>

                {/* Selected Books */}
                <AnimatePresence>
                    {selectedBooks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-primary-400" />
                                    <h3 className="text-lg font-semibold text-white">
                                        Selected Books ({selectedBooks.length})
                                    </h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={limit}
                                        onChange={(e) => setLimit(Number(e.target.value))}
                                        className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white
                                                 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    >
                                        <option value={10}>10 results</option>
                                        <option value={20}>20 results</option>
                                        <option value={30}>30 results</option>
                                    </select>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleClear}
                                        className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
                                    >
                                        Clear All
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <AnimatePresence>
                                    {selectedBooks.map((book, index) => (
                                        <motion.div
                                            key={book}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-full border border-primary-500/30 group hover:border-primary-500/50 transition-all"
                                        >
                                            <Library className="w-4 h-4 text-primary-400" />
                                            <span className="text-sm font-medium text-slate-300">{book}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.2, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleRemoveBook(book)}
                                                className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                                            >
                                                <X size={14} className="text-slate-400 group-hover:text-red-400" />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                {selectedBooks.length > 0 ? (
                    <>
                        {/* Top Similar Carousel */}
                        {!isLoading && topSimilar.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <BookCarousel
                                    books={topSimilar}
                                    title="Most Similar"
                                    subtitle="Books that match your selection the best"
                                    onBookClick={handleBookClick}
                                />
                            </motion.div>
                        )}

                        {/* More Similar Grid */}
                        {!isLoading && moreSimilar.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">More Like These</h2>
                                        <p className="text-slate-400 text-sm sm:text-base">Additional similar recommendations</p>
                                    </div>
                                </div>

                                <BookGrid
                                    books={moreSimilar}
                                    loading={false}
                                    onBookClick={handleBookClick}
                                />
                            </motion.section>
                        )}

                        {/* Loading & Error States */}
                        {isLoading && (
                            <BookGrid books={[]} loading={true} />
                        )}
                        {error && (
                            <BookGrid books={[]} error={error.message} />
                        )}
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-2xl p-12 sm:p-16 text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <BookMarked className="w-16 h-16 sm:w-20 sm:h-20 text-primary-500/50 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                            Start Your Discovery Journey
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-6">
                            Add book titles above to find similar recommendations. You can add multiple books for more accurate results!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSurpriseMe}
                            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/30 inline-flex items-center gap-2"
                        >
                            <Shuffle className="w-5 h-5" />
                            Try Random Book
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Book Detail Modal */}
            <BookDetailModal
                book={selectedBook}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};
