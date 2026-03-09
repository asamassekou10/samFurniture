import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-primary mb-2">Page Not Found</h2>
      <p className="text-text-light mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
