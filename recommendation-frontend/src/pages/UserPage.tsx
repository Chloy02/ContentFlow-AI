import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookGrid } from '../components/BookGrid';
import { BookCarousel } from '../components/BookCarousel';
import { BounceCards } from '../components/BounceCards';
import { SearchBar } from '../components/SearchBar';
import { BookDetailModal } from '../components/BookDetailModal';
import { useUserRecommendations } from '../hooks/useRecommendations';
import { UserCircle, Heart, TrendingUp, Star, Target, Sparkles, Layers } from 'lucide-react';
import type { Book } from '../types/book';

export const UserPage = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [limit, setLimit] = useState(20);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data: books, isLoading, error } = useUserRecommendations(userId, limit);

    const handleSearch = (query: string) => {
        const id = parseInt(query);
        if (!isNaN(id) && id > 0) {
            setUserId(id);
        }
    };

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const topMatches = books?.slice(0, 8) || [];
    const moreRecommendations = books?.slice(8) || [];

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
                            <UserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading">
                                Personalized For You
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base">
                                AI-powered recommendations tailored to your taste
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
                    <div className="glass-card p-6 rounded-2xl border border-primary-500/20">
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder="Enter User ID (e.g., 1, 2, 3...)"
                            buttonText="Get Recommendations"
                        />
                        {userId && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 flex flex-wrap items-center gap-3"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full border border-primary-500/30">
                                    <Target className="w-4 h-4 text-primary-400" />
                                    <span className="text-sm text-slate-300">
                                        User ID: <span className="font-bold text-white">{userId}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-slate-400">
                                        Show:
                                    </label>
                                    <select
                                        value={limit}
                                        onChange={(e) => setLimit(Number(e.target.value))}
                                        className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white
                                                 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    >
                                        <option value={10}>10 books</option>
                                        <option value={20}>20 books</option>
                                        <option value={30}>30 books</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Results */}
                {userId ? (
                    <>
                        {/* User Stats Card */}
                        {!isLoading && books && books.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                            >
                                <div className="glass-card p-6 rounded-2xl border border-primary-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary-500/20 rounded-xl">
                                            <Heart className="w-6 h-6 text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">{books.length}</p>
                                            <p className="text-slate-400 text-sm">Recommendations</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-2xl border border-secondary-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-secondary-500/20 rounded-xl">
                                            <TrendingUp className="w-6 h-6 text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">
                                                {Math.round(books[0]?.score ? books[0].score * 100 : 0)}%
                                            </p>
                                            <p className="text-slate-400 text-sm">Top Match</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-2xl border border-accent-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-accent-500/20 rounded-xl">
                                            <Star className="w-6 h-6 text-accent-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">
                                                {(books.reduce((acc, b) => acc + (b.averageRating || 0), 0) / books.length).toFixed(1)}
                                            </p>
                                            <p className="text-slate-400 text-sm">Avg Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BounceCards for Top Matches */}
                        {!isLoading && topMatches.length >= 5 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                                        <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">Perfect Matches</h2>
                                        <p className="text-slate-400 text-sm sm:text-base">Your highest compatibility scores</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <BounceCards
                                        className="bounce-cards-user"
                                        images={topMatches.slice(0, 5).map(book => book.thumbnail || 'https://via.placeholder.com/400')}
                                        containerWidth={600}
                                        containerHeight={350}
                                        animationDelay={0.3}
                                        animationStagger={0.08}
                                        easeType="elastic.out(1, 0.5)"
                                        transformStyles={[
                                            'rotate(5deg) translate(-150px)',
                                            'rotate(0deg) translate(-70px)',
                                            'rotate(-5deg)',
                                            'rotate(5deg) translate(70px)',
                                            'rotate(-5deg) translate(150px)',
                                        ]}
                                        enableHover={true}
                                    />
                                </div>
                            </motion.section>
                        )}

                        {/* Top Matches Carousel */}
                        {!isLoading && topMatches.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <BookCarousel
                                    books={topMatches}
                                    title="Your Top Matches"
                                    subtitle="These books align perfectly with your preferences"
                                    showScore={true}
                                    onBookClick={handleBookClick}
                                />
                            </motion.div>
                        )}

                        {/* More Recommendations Grid */}
                        {!isLoading && moreRecommendations.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">More For You</h2>
                                        <p className="text-slate-400 text-sm sm:text-base">Additional personalized picks</p>
                                    </div>
                                </div>

                                <BookGrid
                                    books={moreRecommendations}
                                    loading={false}
                                    showScore={true}
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
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <UserCircle className="w-16 h-16 sm:w-20 sm:h-20 text-primary-500/50 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                            Discover Your Perfect Reads
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
                            Enter your User ID above to unlock personalized book recommendations powered by AI
                        </p>
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

export default UserPage;
