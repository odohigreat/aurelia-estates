import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/ui/PublicNavbar';
import { Footer } from '../components/landing/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-gray-800 selection:bg-primary selection:text-background flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        {/* Navbar paints while the route chunk loads; the full-height placeholder keeps the footer from shifting. */}
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
