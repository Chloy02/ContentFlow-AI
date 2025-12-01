import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '../types/book';
import { BookCard } from './BookCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BookCarouselProps {
    books: Book[];
    title?: string;
    subtitle?: string;
    showScore?: boolean;
    autoplay?: boolean;
    onBookClick?: (book: Book) => void;
}

export const BookCarousel = ({
    books,
    title,
    subtitle,
    showScore = false,
    autoplay = false,
    onBookClick,
}: BookCarouselProps) => {
    const navigationPrevRef = useRef<HTMLButtonElement>(null);
    const navigationNextRef = useRef<HTMLButtonElement>(null);

    if (!books || books.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Section Header */}
            {(title || subtitle) && (
                <div className="mb-6 px-4 sm:px-0">
                    {title && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Carousel Container */}
            <div className="relative group">
                {/* Navigation Buttons - Hidden on mobile */}
                <button
                    ref={navigationPrevRef}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                             items-center justify-center w-12 h-12 rounded-full
                             bg-dark-700/90 backdrop-blur-sm border border-primary-500/30
                             text-primary-400 hover:text-primary-300 hover:bg-dark-600/90
                             hover:border-primary-400/50 transition-all duration-300
                             opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0
                             shadow-lg hover:shadow-primary-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    ref={navigationNextRef}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                             items-center justify-center w-12 h-12 rounded-full
                             bg-dark-700/90 backdrop-blur-sm border border-primary-500/30
                             text-primary-400 hover:text-primary-300 hover:bg-dark-600/90
                             hover:border-primary-400/50 transition-all duration-300
                             opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0
                             shadow-lg hover:shadow-primary-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper: any) => {
                        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }
                    }}
                    autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
                    loop={books.length > 4}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 12 },
                        480: { slidesPerView: 1.5, spaceBetween: 16 },
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 2.5, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 4, spaceBetween: 24 },
                        1536: { slidesPerView: 5, spaceBetween: 24 },
                    }}
                    className="!px-4 sm:!px-0"
                >
                    {books.map((book, index) => (
                        <SwiperSlide key={`${book.itemId}-${index}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                            >
                                <BookCard book={book} showScore={showScore} onBookClick={onBookClick} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};
