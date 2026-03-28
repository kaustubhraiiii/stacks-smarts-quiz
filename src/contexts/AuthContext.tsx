import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useUser, useAuth as useClerkAuth, useSession } from '@clerk/react';
import { createClerkSupabaseClient } from '@/integrations/supabase/clerk-client';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import type { TablesInsert } from '@/integrations/supabase/types';

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  userId: string | null;
  userFullName: string | null;
  userEmail: string | null;
  userAvatarUrl: string | null;
  userProfile: UserProfile | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  supabaseClient: SupabaseClient<Database>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken, isLoaded: isAuthLoaded } = useClerkAuth();
  const { session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clerkToken, setClerkToken] = useState<string | null>(null);

  // Keep the Clerk token fresh for Supabase requests
  useEffect(() => {
    if (!session) {
      setClerkToken(null);
      return;
    }

    const fetchToken = async () => {
      try {
        const token = await getToken({ template: 'supabase' });
        setClerkToken(token);
      } catch (error) {
        console.error('Error fetching Clerk token for Supabase:', error);
        setClerkToken(null);
      }
    };

    fetchToken();

    // Refresh token periodically (every 50 seconds, tokens last 60s)
    const interval = setInterval(fetchToken, 50000);
    return () => clearInterval(interval);
  }, [session, getToken]);

  // Create a Supabase client authenticated with the Clerk JWT
  const supabaseClient = useMemo(
    () => createClerkSupabaseClient(clerkToken),
    [clerkToken]
  );

  // Fetch or create user profile when user signs in
  const fetchOrCreateProfile = useCallback(async () => {
    if (!user || !clerkToken) {
      setUserProfile(null);
      return;
    }

    try {
      // Try to fetch existing profile
      const { data, error } = await supabaseClient
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setUserProfile(data);
        return;
      }

      // Profile doesn't exist — create one
      if (error && error.code === 'PGRST116') {
        const profileData: TablesInsert<'user_profiles'> = {
          id: user.id,
          full_name: user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
          avatar_url: user.imageUrl ?? null,
        };

        const { data: newProfile, error: insertError } = await supabaseClient
          .from('user_profiles')
          .insert(profileData as any)
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        } else {
          setUserProfile(newProfile);
        }
        return;
      }

      if (error) {
        console.error('Error fetching user profile:', error);
      }
    } catch (err) {
      console.error('Exception in fetchOrCreateProfile:', err);
    }
  }, [user, clerkToken, supabaseClient]);

  useEffect(() => {
    fetchOrCreateProfile();
  }, [fetchOrCreateProfile]);

  const isLoaded = isUserLoaded && isAuthLoaded;

  const value: AuthContextType = {
    userId: user?.id ?? null,
    userFullName: user?.fullName ?? user?.firstName ?? null,
    userEmail: user?.primaryEmailAddress?.emailAddress ?? null,
    userAvatarUrl: user?.imageUrl ?? null,
    userProfile,
    isSignedIn: !!user,
    isLoaded,
    supabaseClient,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
