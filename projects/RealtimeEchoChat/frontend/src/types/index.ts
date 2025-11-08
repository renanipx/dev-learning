export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Room {
  _id: string;
  name: string;
  description: string;
  createdBy: User;
  createdAt: string;
}

export interface Message {
  _id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateRoomRequest {
  name: string;
  description: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface SocketEvents {
  'user:connected': (user: User) => void;
  'user:disconnected': (userId: string) => void;
  'room:joined': (room: Room, users: User[]) => void;
  'room:left': (roomId: string, userId: string) => void;
  'room:message': (message: Message) => void;
  'room:typing': (roomId: string, userId: string, username: string) => void;
  'room:typing:stop': (roomId: string, userId: string) => void;
}