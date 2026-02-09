import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase} from "../lib/supabase.js";
import type { User } from "../lib/supabase.js";
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode; 

}interface AuthContextType {
  signUp: (data: { email: string; password: string }) => Promise<any>;
  signIn: (data: { email: string; password: string }) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  handleLogout: () => Promise<void>;
  user: User | null;
  resetTimer: () => void;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const timeoutRef = useRef<number|null>(null);
  const navigate = useNavigate();

 
  const LOGOUT_TIME = 7200000; 

  const handleLogout = async () => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login'); 
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(handleLogout, LOGOUT_TIME);
  };

  useEffect(() => {
   
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) resetTimer(); 
    });

   
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        resetTimer();
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    });

   
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    
   
    if (user) {
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]); 

  const value = {
    signUp: (data: { email: string; password: string }) => supabase.auth.signUp(data),
    signIn: (data: { email: string; password: string }) => supabase.auth.signInWithPassword(data),
    signInWithGoogle: () => 
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/` },
      }),
    handleLogout,
    user,
    resetTimer,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};