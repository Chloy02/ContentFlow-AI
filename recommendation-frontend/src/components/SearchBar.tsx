import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    buttonText?: string;
}

export const SearchBar = ({
    onSearch,
    placeholder = 'Search...',
    buttonText = 'Search',
}: SearchBarProps) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   placeholder-gray-400 text-gray-900"
                />
            </div>
            <button type="submit" className="btn-primary">
                {buttonText}
            </button>
        </form>
    );
};
