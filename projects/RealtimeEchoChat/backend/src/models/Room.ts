import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Room name must be at least 3 characters long'],
    maxlength: [50, 'Room name cannot exceed 50 characters'],
    match: [/^[a-zA-Z0-9-_\s]+$/, 'Room name can only contain letters, numbers, spaces, hyphens, and underscores']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

roomSchema.index({ name: 1 });
roomSchema.index({ createdBy: 1 });

export default mongoose.model<IRoom>('Room', roomSchema);