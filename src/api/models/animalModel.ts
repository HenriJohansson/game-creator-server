import {Schema, model} from 'mongoose';
import {Animal} from '../../interfaces/Animal';
// Schema for the Animal model
// based on the Animal interface located at: src/interfaces/Animal.ts

const animalSchema = new Schema<Animal>({
  animal_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  species: {
    type: Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
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
    required: true,
  },
});

export default model<Animal>('Animal', animalSchema);
