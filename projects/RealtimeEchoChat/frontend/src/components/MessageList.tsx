import React from 'react';
import { Message } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {messages.map((message) => {
        const isOwn = message.userId === user?._id;
        
        return (
          <div
            key={message._id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`message-bubble ${isOwn ? 'message-own' : 'message-other'}`}>
              <div className="flex items-end space-x-2">
                {!isOwn && (
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {message.username}
                  </span>
                )}
                <span className="text-sm">{message.content}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 opacity-75">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MessageList;