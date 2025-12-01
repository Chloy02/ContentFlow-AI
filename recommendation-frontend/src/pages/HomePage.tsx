import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookGrid } from '../components/BookGrid';
import { BookCarousel } from '../components/BookCarousel';
import { BookDetailModal } from '../components/BookDetailModal';
import { GenreChips, popularGenres } from '../components/GenreChips';
import { SkeletonHero } from '../components/SkeletonLoader';
import { useGlobalRecommendations } from '../hooks/useRecommendations';
import { Sparkles, Star, BookOpen, Zap, Award, Play } from 'lucide-react';
import type { Book } from '../types/book';

export const HomePage = () => {
    const [limit] = useState(30);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    const { data: books, isLoading, error } = useGlobalRecommendations(limit);

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const featuredBook = books?.[0];
    const trendingBooks = books?.slice(0, 10) || [];
    const topRatedBooks = books?.filter(b => b.averageRating && b.averageRating >= 4.5).slice(0, 10) || [];
    const newArrivals = books?.slice(10, 20) || [];
    const popularPicks = books?.slice(20) || [];

    return (
        <div className="min-h-screen">
            {/* Hero Section with Featured Book */}
            {isLoading ? (
                <SkeletonHero />
            ) : featuredBook ? (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[70vh] sm:h-[85vh] overflow-hidden"
                >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, ease: 'easeOut' }}
                            src={featuredBook.thumbnail || 'https://via.placeholder.com/1920x1080'}
                            alt={featuredBook.title}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/95 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative container h-full flex items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="max-w-2xl space-y-4 sm:space-y-6 pt-16 sm:pt-20 px-4 sm:px-0"
                        >
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-full border border-primary-500/30"
                                >
                                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
                                    <span className="text-xs sm:text-sm font-semibold text-primary-300">Featured Today</span>
                                </motion.div>
                                {featuredBook.averageRating && (
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 glass rounded-full"
                                    >
                                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                                        <span className="text-xs sm:text-sm font-bold text-white">{featuredBook.averageRating.toFixed(1)}</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-heading">
                                {featuredBook.title}
                            </h1>

                            {/* Authors */}
                            {featuredBook.authors && featuredBook.authors.length > 0 && (
                                <p className="text-base sm:text-lg md:text-xl text-slate-300 flex items-center gap-2">
                                    <span className="text-slate-500">by</span>
                                    <span className="font-medium">{featuredBook.authors.join(', ')}</span>
                                </p>
                            )}

                            {/* Description */}
                            {featuredBook.description && (
                                <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl">
                                    {featuredBook.description}
                                </p>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleBookClick(featuredBook)}
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold rounded-xl transition-all duration-200 shadow-2xl shadow-primary-500/30 flex items-center gap-2 text-sm sm:text-base"
                                >
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                    View Details
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-8 py-3 sm:py-4 glass hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/30 hover:border-white/50 text-sm sm:text-base"
                                >
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                                    Read Now
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient Fade to Content */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none"></div>
                </motion.section>
            ) : null}

            {/* Content Sections */}
            <div className="container py-8 sm:py-12 space-y-12 sm:space-y-16">
                {/* Genre Filter */}
                {!isLoading && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-accent-400" />
                            <h3 className="text-lg sm:text-xl font-bold text-white">Browse by Genre</h3>
                        </div>
                        <GenreChips
                            genres={popularGenres}
                            selectedGenre={selectedGenre}
                            onGenreSelect={setSelectedGenre}
                        />
                    </motion.section>
                )}

                {/* Trending Now Carousel */}
                {!isLoading && trendingBooks.length > 0 && (
                    <BookCarousel
                        books={trendingBooks}
                        title="Trending Now"
                        subtitle="Most popular books this week"
                        onBookClick={handleBookClick}
                    />
                )}

                {/* Top Rated Carousel */}
                {!isLoading && topRatedBooks.length > 0 && (
                    <BookCarousel
                        books={topRatedBooks}
                        title="Top Rated"
                        subtitle="Highest rated by our community"
                        onBookClick={handleBookClick}
                    />
                )}

                {/* New Arrivals Carousel */}
                {!isLoading && newArrivals.length > 0 && (
                    <BookCarousel
                        books={newArrivals}
                        title="New Discoveries"
                        subtitle="Fresh recommendations just for you"
                        autoplay
                        onBookClick={handleBookClick}
                    />
                )}

                {/* All Books Section */}
                {!isLoading && popularPicks.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">Popular Picks</h2>
                                <p className="text-slate-400 text-sm sm:text-base">Books everyone is talking about</p>
                            </div>
                        </div>

                        <BookGrid
                            books={popularPicks}
                            loading={isLoading}
                            error={error?.message}
                            onBookClick={handleBookClick}
                        />
                    </motion.section>
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
