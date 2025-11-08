import React from 'react';
import { Room } from '../types';
import { Hash } from 'lucide-react';

interface RoomListProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onRoomSelect: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, selectedRoom, onRoomSelect }) => {
  return (
    <div className="p-4">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
        Rooms
      </h2>
      
      {rooms.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
          No rooms available. Create one to get started!
        </p>
      ) : (
        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => onRoomSelect(room)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                selectedRoom?._id === room._id
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                  : 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Hash className="h-4 w-4 mr-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{room.name}</p>
                  {room.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {room.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;