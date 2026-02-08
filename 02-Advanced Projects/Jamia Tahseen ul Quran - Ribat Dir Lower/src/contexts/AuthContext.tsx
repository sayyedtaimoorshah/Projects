import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in production, this would use Lovable Cloud/Supabase
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@madrasa.pk',
    role: 'admin',
    name: 'مدیر اعلیٰ',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'teacher@madrasa.pk',
    role: 'teacher',
    name: 'استاذ محترم',
    createdAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('madrasa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Demo: Find mock user or create session
    const mockUser = MOCK_USERS.find(u => u.email === email);
    
    if (mockUser && password.length >= 6) {
      setUser(mockUser);
      localStorage.setItem('madrasa_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return { success: true };
    }
    
    // For demo, allow any login with valid format
    if (email.includes('@') && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role: 'student',
        name: email.split('@')[0],
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('madrasa_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!email.includes('@') || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password (min 6 characters)' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      name,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('madrasa_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('madrasa_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
