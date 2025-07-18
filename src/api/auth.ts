import axios from "axios";
import type {LoginResponse} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async (username: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username: username
        });
        const data: LoginResponse = response.data;
        if (data.accessToken && data.refreshToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            console.log('Login successful');
        } else {
            console.error('Invalid login response:', data);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};
export const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Logged out successfully');
};
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error('No refresh token found');
        return;
    }
    try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken: refreshToken
        });
        const data: LoginResponse = response.data;
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            console.log('Access token refreshed successfully');
        } else {
            console.error('Invalid refresh response:', data);
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}