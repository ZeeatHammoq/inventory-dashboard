import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type AuthState } from '../types';

// Dummy JWT authentication
const DUMMY_USER = {
    id: '1',
    email: 'admin@inventory.com',
    name: 'Admin User'
};

const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.dummy_signature';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Dummy validation
                if (email === 'admin@inventory.com' && password === 'password123') {
                    set({
                        user: DUMMY_USER,
                        token: DUMMY_TOKEN,
                        isAuthenticated: true
                    });
                } else {
                    throw new Error('Invalid credentials');
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                });
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);