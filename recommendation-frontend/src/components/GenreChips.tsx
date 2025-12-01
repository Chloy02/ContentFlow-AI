import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GenreChipProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export const GenreChip = ({ label, active = false, onClick, icon }: GenreChipProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={clsx(
                'px-4 py-2 rounded-full font-medium text-sm transition-all duration-300',
                'border backdrop-blur-sm flex items-center gap-2 whitespace-nowrap',
                active
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-primary-400 shadow-lg shadow-primary-500/30'
                    : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-primary-500/50 hover:text-primary-400'
            )}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {label}
        </motion.button>
    );
};

interface GenreChipsProps {
    genres: string[];
    selectedGenre?: string;
    onGenreSelect?: (genre: string) => void;
}

export const GenreChips = ({ genres, selectedGenre, onGenreSelect }: GenreChipsProps) => {
    return (
        <div className="flex flex-wrap gap-2 sm:gap-3">
            {genres.map((genre) => (
                <GenreChip
                    key={genre}
                    label={genre}
                    active={selectedGenre === genre}
                    onClick={() => onGenreSelect?.(genre)}
                />
            ))}
        </div>
    );
};

// Popular genres for book recommendations
export const popularGenres = [
    'All',
    'Fiction',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Fantasy',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Science',
];
