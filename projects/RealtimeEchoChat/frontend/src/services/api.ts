import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { User, Room, Message, LoginRequest, RegisterRequest, CreateRoomRequest, SendMessageRequest, AuthResponse, ApiError } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          Cookies.remove('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.api.get<User>('/auth/profile');
    return response.data;
  }

  async getRooms(): Promise<Room[]> {
    const response = await this.api.get<Room[]>('/rooms');
    return response.data;
  }

  async getRoom(id: string): Promise<Room> {
    const response = await this.api.get<Room>(`/rooms/${id}`);
    return response.data;
  }

  async createRoom(data: CreateRoomRequest): Promise<Room> {
    const response = await this.api.post<Room>('/rooms', data);
    return response.data;
  }

  async getMessages(roomId: string): Promise<Message[]> {
    const response = await this.api.get<Message[]>(`/rooms/${roomId}/messages`);
    return response.data;
  }
}

export const apiService = new ApiService();