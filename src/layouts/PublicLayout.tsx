import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/ui/PublicNavbar';
import { Footer } from '../components/landing/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-gray-200 selection:bg-primary selection:text-background flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
