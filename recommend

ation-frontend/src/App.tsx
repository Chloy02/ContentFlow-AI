import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import { SimilarBooksPage } from './pages/SimilarBooksPage';

// Create React Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/similar" element={<SimilarBooksPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
