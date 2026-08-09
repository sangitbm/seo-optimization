import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-500/20">
        <Search className="h-12 w-12 text-white" />
      </div>
      <h1 className="mb-2 text-6xl font-extrabold tracking-tight sm:text-7xl">404</h1>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Oops! The tool or page you're looking for seems to have vanished or moved. Let's get you back on track.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button render={<Link href="/" />} size="lg" className="gap-2">
          <Home className="h-4 w-4" />
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}
