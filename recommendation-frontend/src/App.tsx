import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import { SimilarBooksPage } from './pages/SimilarBooksPage';
import { FloatingLines } from './components/FloatingLines';

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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/similar" element={<SimilarBooksPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
