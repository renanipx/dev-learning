import React, { useState, useRef, useEffect } from 'react';
import { Room, Message } from '../types';
import { Send, Hash } from 'lucide-react';
import MessageList from './MessageList';

interface ChatRoomProps {
  room: Room;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      handleStopTyping();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      // Emit typing start event
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  const handleStopTyping = () => {
    setIsTyping(false);
    // Emit typing stop event
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Room Header */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4">
        <div className="flex items-center">
          <Hash className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {room.name}
            </h2>
            {room.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {room.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="input w-full"
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="btn btn-primary flex items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;