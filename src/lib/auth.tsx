import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  signOut: async () => {},
});

// Mock user for development
const mockUser = {
  id: "mock-user-id",
  email: "user@example.com",
  user_metadata: {
    name: "Demo User",
  },
  app_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as User;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Set to false to avoid initial loading state

  useEffect(() => {
    // For development, use a mock user instead of trying to connect to Supabase
    setUser(mockUser);
    setLoading(false);

    // In a real app with Supabase configured, you would use this code:
    /*
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
    */
  }, []);

  const signOut = async () => {
    // For development, just clear the user state
    setUser(null);

    // In a real app with Supabase configured:
    /*
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
    */
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
