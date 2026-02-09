import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 font-display">404</h1>
        <p className="text-xl font-medium text-white mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="glass-button w-full py-3 inline-block">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
