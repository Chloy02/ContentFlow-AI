import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { FloatingLines } from './components/FloatingLines';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const SimilarBooksPage = lazy(() => import('./pages/SimilarBooksPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
          <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#2d1b4e] relative overflow-x-hidden">
            {/* Full-screen FloatingLines background */}
            <div className="fixed inset-0 w-full h-full">
              <FloatingLines
                enabledWaves={['top', 'middle', 'bottom']}
                lineCount={[10, 15, 20]}
                lineDistance={[8, 6, 4]}
                bendRadius={5.0}
                bendStrength={-0.5}
                interactive={true}
                parallax={true}
              />
            </div>
            
            {/* Content layer */}
            <div className="relative z-10">
              <Header />
              <main className="pt-16 sm:pt-20">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/similar" element={<SimilarBooksPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
