import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

export const LoadingSpinner = ({ size = 'medium', message }: LoadingSpinnerProps) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
            {message && <p className="text-gray-600 text-sm">{message}</p>}
        </div>
    );
};
