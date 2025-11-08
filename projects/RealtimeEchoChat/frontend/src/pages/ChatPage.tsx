import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { socketService } from '../services/socket';
import { Room, Message } from '../types';
import { User, MessageSquare, Plus, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RoomList from '../components/RoomList';
import ChatRoom from '../components/ChatRoom';
import CreateRoomModal from '../components/CreateRoomModal';

const ChatPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadRooms();
    
    socketService.on('user:connected', (connectedUser) => {
      setOnlineUsers(prev => new Set([...prev, connectedUser._id]));
    });

    socketService.on('user:disconnected', (userId) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    socketService.on('room:message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  const loadRooms = async () => {
    try {
      const roomsData = await apiService.getRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const handleRoomSelect = async (room: Room) => {
    if (selectedRoom?._id === room._id) return;
    
    if (selectedRoom) {
      socketService.leaveRoom(selectedRoom._id);
    }
    
    setSelectedRoom(room);
    socketService.joinRoom(room._id);
    
    try {
      const roomMessages = await apiService.getMessages(room._id);
      setMessages(roomMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleCreateRoom = async (name: string, description: string) => {
    try {
      const newRoom = await apiService.createRoom({ name, description });
      setRooms(prev => [newRoom, ...prev]);
      setShowCreateRoomModal(false);
      handleRoomSelect(newRoom);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleSendMessage = (content: string) => {
    if (selectedRoom) {
      socketService.sendMessage(selectedRoom._id, content);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-primary-600" />
              Echo Chat
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.username}</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Create Room Button */}
        <div className="p-4">
          <button
            onClick={() => setShowCreateRoomModal(true)}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </button>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto">
          <RoomList
            rooms={rooms}
            selectedRoom={selectedRoom}
            onRoomSelect={handleRoomSelect}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <ChatRoom
            room={selectedRoom}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a room to start chatting
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a room from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateRoomModal && (
        <CreateRoomModal
          onClose={() => setShowCreateRoomModal(false)}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
};

export default ChatPage;