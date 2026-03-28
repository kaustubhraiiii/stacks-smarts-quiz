import React from 'react';
import { useAuth } from '@clerk/react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <>{fallback}</>;
  }

  if (!isSignedIn) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
