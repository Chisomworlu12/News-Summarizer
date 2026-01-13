import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

 
  const LOGOUT_TIME = 7200000; 

  const handleLogout = async () => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleLogout, LOGOUT_TIME);
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
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signInWithGoogle: () => 
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/` },
      }),
    handleLogout,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};