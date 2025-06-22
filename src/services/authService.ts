import { API_BASE_URL } from '../config/api';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone: string;
  accountType: 'FREE' | 'PROFESSIONAL' | 'VENUE';
  trustScore: number;
  avatar?: string;
  bio?: string;
  phoneVerified: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SignupData {
  phone: string;
  name: string;
  username: string;
  email?: string;
  accountType?: 'FREE' | 'PROFESSIONAL' | 'VENUE';
  bio?: string;
}

export interface LoginData {
  phone: string;
  password?: string;
}

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const result = await response.json();
    this.setTokens(result.token, result.refreshToken);
    return result;
  }

  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to log in');
    }

    const result = await response.json();
    this.setTokens(result.token, result.refreshToken);
    return result;
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Failed to refresh token');
    }

    const { token, refreshToken: newRefreshToken } = await response.json();
    this.setTokens(token, newRefreshToken);
    return token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private accessToken: string | null = null;
  private user: User | null = null;

  constructor() {
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      try {
        this.accessToken = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        
        // Only try to parse if we have a valid string
        if (userStr && userStr !== 'undefined' && userStr !== 'null' && userStr.trim() !== '') {
          try {
            this.user = JSON.parse(userStr);
          } catch (parseError) {
            console.error('Error parsing stored user:', parseError);
            this.clearStoredData();
          }
        } else {
          this.clearStoredData();
        }
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        this.clearStoredData();
      }
    }
  }

  private clearStoredData(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.user = null;
        this.accessToken = null;
      } catch (e) {
        console.error('Error clearing stored data:', e);
      }
    }
  }

  async verifyPhone(phone: string, code: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth-full/verify-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: this.formatPhoneNumber(phone), code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'Phone verification failed');
    }

    const result: AuthResponse = await response.json();
    this.setAuthData(result);
    return result;
  }

  async requestPhoneVerification(phone: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/auth-full/send-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: this.formatPhoneNumber(phone) }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'Failed to send verification code');
    }

    return response.json();
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.accessToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return null;
        }
        throw new Error('Failed to get current user');
      }

      const result = await response.json();
      this.user = result.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      return this.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  getUser(): User | null {
    return this.user;
  }

  private setAuthData(authResponse: AuthResponse): void {
    this.accessToken = authResponse.accessToken;
    this.user = authResponse.user;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
      } catch (e) {
        console.error('Error storing auth data:', e);
        this.clearStoredData();
      }
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // If it's a 10-digit US number, add +1 prefix
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    
    // If it's 11 digits starting with 1, add + prefix
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+${digits}`;
    }
    
    // If it already has + prefix, return as is
    if (phone.startsWith('+')) {
      return phone;
    }
    
    // For other cases, assume it needs +1 prefix
    return `+1${digits}`;
  }
}

export const authService = new AuthService();
export default authService;