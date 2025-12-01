import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary-200">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    <Home size={18} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};
