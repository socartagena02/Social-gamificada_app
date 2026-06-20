import React, {createContext, useState, useEffect, ReactNode} from "react";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface AuthContextType {
    token: string | null;
    isLoading: boolean;
    isSignedIn: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: true,
  isSignedIn: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }){
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        bootstrapAsync();
    },[]);
    const bootstrapAsync =async () => {
    try {
      const savedToken = await SecureStore.getItemAsync('access_token');
      setToken(savedToken);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();
  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    setToken(null);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        isSignedIn: !!token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
