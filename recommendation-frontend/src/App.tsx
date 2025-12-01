import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import { SimilarBooksPage } from './pages/SimilarBooksPage';

import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFoundPage } from './pages/NotFoundPage';

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
      <ErrorBoundary>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/similar" element={<SimilarBooksPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
