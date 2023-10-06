import {Schema, model} from 'mongoose';
import {Marker} from '../../interfaces/Marker';
// Schema for the Animal model
// based on the Animal interface located at: src/interfaces/Animal.ts

const markerSchema = new Schema<Marker>({
  marker_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: false,
  },
  creation_date: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coordinates: number[]) => {
          return coordinates.length === 2;
        },
        message: 'Coordinates must be an array of two numbers',
      },
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

export default model<Marker>('Marker', markerSchema);
