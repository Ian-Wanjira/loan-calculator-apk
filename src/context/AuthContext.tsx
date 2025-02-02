import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Function that will be used during login. It receives the tokens
  // and saves them to AsyncStorage and updates the context state.
  const login = (accessTok: string, refreshTok: string) => {
    setAccessToken(accessTok);
    setRefreshToken(refreshTok);
    setIsAuthenticated(true);
    // Persist the tokens to AsyncStorage as JSON values.
    AsyncStorage.setItem('accessToken', accessTok);
    AsyncStorage.setItem('refreshToken', refreshTok);
  };

  // Logout clears both state and tokens from AsyncStorage.
  const logout = async () => {
    setIsAuthenticated(false);
    setAccessToken('');
    setRefreshToken('');
    // Clear the tokens
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  // On app load, try to retrieve tokens from AsyncStorage to hydrate the state.
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load tokens from storage', error);
      } finally {
        setIsLoading(false); // Finished loading initial auth state
      }
    };

    loadTokens();
  }, []);

  // Memoize the value to prevent unnecessary re-renders.
  const value = useMemo(
    () => ({
      isAuthenticated,
      accessToken,
      refreshToken,
      login,
      logout,
      isLoading,
    }),
    [isAuthenticated, accessToken, refreshToken, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};
