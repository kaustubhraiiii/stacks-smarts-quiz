import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { DatabaseService, UserProfile } from '@/services/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const profile = await DatabaseService.getUserProfile(userId);
      console.log('User profile fetched:', profile);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  // Function to handle auth state changes
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('Auth state change:', event, session);
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      // Wait a bit for the user profile to be created (especially for OAuth)
      if (event === 'SIGNED_IN') {
        setTimeout(async () => {
          const profile = await fetchUserProfile(session.user.id);
          setUserProfile(profile);
          setLoading(false);
        }, 1000);
      } else {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
        setLoading(false);
      }
    } else {
      setUserProfile(null);
      setLoading(false);
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) setLoading(false);
          return;
        }

        console.log('Initial session:', session);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const profile = await fetchUserProfile(session.user.id);
            if (mounted) {
              setUserProfile(profile);
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('Auth loading timeout - forcing loading to false');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [handleAuthStateChange, fetchUserProfile, loading]);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      console.log('Signing up user:', email);
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        setLoading(false);
      } else {
        console.log('Sign up success:', data);
        // Don't set loading to false here - let the auth state change handle it
      }
      
      return { data, error };
    } catch (err) {
      console.error('Sign up exception:', err);
      setLoading(false);
      return { data: null, error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in error:', error);
        setLoading(false);
      } else {
        console.log('Sign in success:', data);
        // Don't set loading to false here - let the auth state change handle it
      }
      
      return { data, error };
    } catch (err) {
      console.error('Sign in exception:', err);
      setLoading(false);
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      } else {
        console.log('Sign out success');
      }
      setLoading(false);
    } catch (err) {
      console.error('Sign out exception:', err);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Signing in with Google');
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        setLoading(false);
      } else {
        console.log('Google sign in initiated:', data);
        // Don't set loading to false here - let the auth state change handle it
      }
      
      return { data, error };
    } catch (err) {
      console.error('Google sign in exception:', err);
      setLoading(false);
      return { data: null, error: err };
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    const updatedProfile = await DatabaseService.updateUserProfile(user.id, updates);
    if (updatedProfile) {
      setUserProfile(updatedProfile);
    }
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
