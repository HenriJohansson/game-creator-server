import {Schema, model} from 'mongoose';
import {Marker} from '../../interfaces/Marker';

const markerSchema = new Schema<Marker>({
  id: {
    type: String,
    reguired: true,
    minlength: 1,
  },
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
    max: new Date(Date.now() + 24 * 3600000),
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
