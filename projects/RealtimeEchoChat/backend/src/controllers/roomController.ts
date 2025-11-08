import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Room from '../models/Room';
import { AuthRequest, CreateRoomRequest } from '../types';

export const createRoom = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const { name, description }: CreateRoomRequest = req.body;
    const userId = req.user!.userId;

    const existingRoom = await Room.findOne({ name: name.trim() });
    if (existingRoom) {
      res.status(400).json({
        success: false,
        message: 'Room name already exists'
      });
      return;
    }

    const room = new Room({
      name: name.trim(),
      description: description?.trim(),
      createdBy: userId
    });

    await room.save();

    const populatedRoom = await Room.findById(room._id).populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: {
        room: {
          id: populatedRoom!._id,
          name: populatedRoom!.name,
          description: populatedRoom!.description,
          createdBy: (populatedRoom!.createdBy as any).username,
          createdAt: populatedRoom!.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create room'
    });
  }
};

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .limit(50);

    const formattedRooms = rooms.map(room => ({
      id: room._id,
      name: room.name,
      description: room.description,
      createdBy: (room.createdBy as any).username,
      createdAt: room.createdAt
    }));

    res.json({
      success: true,
      data: {
        rooms: formattedRooms,
        total: formattedRooms.length
      }
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get rooms'
    });
  }
};

export const getRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate('createdBy', 'username');

    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        room: {
          id: room._id,
          name: room.name,
          description: room.description,
          createdBy: (room.createdBy as any).username,
          createdAt: room.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get room'
    });
  }
};