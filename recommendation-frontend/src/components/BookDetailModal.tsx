import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, User, BookOpen, Calendar, Award, ExternalLink } from 'lucide-react';
import type { Book } from '../types/book';

interface BookDetailModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BookDetailModal = ({ book, isOpen, onClose }: BookDetailModalProps) => {
    if (!book) return null;

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'from-amber-400 to-yellow-500';
        if (rating >= 4) return 'from-yellow-400 to-amber-500';
        if (rating >= 3.5) return 'from-orange-400 to-yellow-500';
        return 'from-gray-400 to-gray-500';
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl glass border border-primary-500/30 p-0 shadow-2xl transition-all">
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={onClose}
                                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-400 hover:text-white hover:border-primary-500 transition-all duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        {/* Content */}
                                        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                                            {/* Book Cover */}
                                            <div className="md:w-1/3 flex-shrink-0">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="relative rounded-xl overflow-hidden shadow-2xl"
                                                >
                                                    {book.thumbnail ? (
                                                        <img
                                                            src={book.thumbnail}
                                                            alt={book.title}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                            <BookOpen className="w-16 h-16 text-slate-600" />
                                                        </div>
                                                    )}
                                                    
                                                    {/* Rating Badge */}
                                                    {book.averageRating && (
                                                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 bg-black/70 backdrop-blur-md rounded-full">
                                                            <Star size={16} className={`bg-gradient-to-r ${getRatingColor(book.averageRating)} bg-clip-text text-transparent fill-amber-400`} />
                                                            <span className="text-white text-sm font-bold">
                                                                {book.averageRating.toFixed(1)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Book Info */}
                                            <div className="flex-1 space-y-4">
                                                {/* Title */}
                                                <div>
                                                    <Dialog.Title className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight">
                                                        {book.title}
                                                    </Dialog.Title>
                                                </div>

                                                {/* Authors */}
                                                {book.authors && book.authors.length > 0 && (
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <User size={18} className="text-primary-400" />
                                                        <span className="font-medium">
                                                            {book.authors.join(', ')}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Stats */}
                                                <div className="flex flex-wrap gap-4">
                                                    {book.averageRating && (
                                                        <div className="flex items-center gap-2">
                                                            <Award size={18} className="text-accent-400" />
                                                            <span className="text-sm text-slate-400">
                                                                Rating: <span className="font-semibold text-white">{book.averageRating.toFixed(1)}/5</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {book.ratingsCount && (
                                                        <div className="flex items-center gap-2">
                                                            <Star size={18} className="text-accent-400" />
                                                            <span className="text-sm text-slate-400">
                                                                {book.ratingsCount.toLocaleString()} ratings
                                                            </span>
                                                        </div>
                                                    )}
                                                    {book.score !== null && (
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={18} className="text-primary-400" />
                                                            <span className="text-sm text-slate-400">
                                                                Match: <span className="font-semibold text-primary-400">{Math.round(book.score * 100)}%</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {book.description && (
                                                    <div className="space-y-2">
                                                        <h3 className="text-lg font-semibold text-white">Description</h3>
                                                        <p className="text-slate-400 leading-relaxed text-sm md:text-base max-h-60 overflow-y-auto custom-scrollbar">
                                                            {book.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="flex flex-wrap gap-3 pt-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/30"
                                                    >
                                                        <BookOpen size={18} />
                                                        Read Now
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700 hover:border-primary-500/50"
                                                    >
                                                        <ExternalLink size={18} />
                                                        Learn More
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
